import { BadRequestException, ConflictException, Injectable, Logger, OnModuleDestroy, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
import bigInt from 'big-integer';
import { Api, TelegramClient } from 'teleproto';
import { StringSession } from 'teleproto/sessions';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';

const SYNC_INTERVAL_MS = 30_000;
type TelegramEntity = Record<string, any>;

@Injectable()
export class TelegramRelayService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TelegramRelayService.name);
  private client?: TelegramClient;
  private timer?: NodeJS.Timeout;
  private syncing = false;
  private connecting = false;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const apiId = Number(process.env.TELEGRAM_API_ID);
    const apiHash = process.env.TELEGRAM_API_HASH?.trim();
    const session = process.env.TELEGRAM_RELAY_SESSION?.trim();
    if (!Number.isSafeInteger(apiId) || apiId <= 0 || !apiHash || !session) {
      this.logger.log('Telegram relay is not configured; NFT sync and withdrawal stay disabled.');
      return;
    }
    await this.connectRelay();
    this.timer = setInterval(() => {
      if (this.client) void this.syncIncomingGifts().catch((error) => this.logger.error(`Telegram gift sync failed: ${this.errorText(error)}`));
      else void this.connectRelay();
    }, SYNC_INTERVAL_MS);
  }

  async onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
    if (this.client) await this.client.disconnect();
  }

  status() {
    const username = process.env.TELEGRAM_RELAY_USERNAME?.trim().replace(/^@/, '') || null;
    return {
      configured: Boolean(this.client),
      sessionConfigured: Boolean(process.env.TELEGRAM_RELAY_SESSION?.trim()),
      relayUsername: username,
      mode: 'MTProto' as const,
    };
  }

  async createDepositIntent(userId: string) {
    if (!this.client) throw new ServiceUnavailableException('Telegram relay is not connected');
    const username = process.env.TELEGRAM_RELAY_USERNAME?.trim().replace(/^@/, '');
    if (!username) throw new ServiceUnavailableException('Set TELEGRAM_RELAY_USERNAME to enable NFT deposits');
    const code = `ORBIT-${randomBytes(5).toString('hex').toUpperCase()}`;
    const intent = await this.prisma.giftDepositIntent.create({ data: { userId, code } });
    return { id: intent.id, code, status: intent.status, chatUrl: `https://t.me/${username}?text=${encodeURIComponent(`NFT deposit ${code}`)}` };
  }

  async requestNftWithdrawal(userId: string, giftId: string) {
    const client = this.client;
    if (!client) throw new ServiceUnavailableException('Telegram relay is not connected');
    const requestCode = `AUTO-${randomBytes(10).toString('hex')}`;
    const reserved = await this.prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "Gift" WHERE "id" = ${giftId} FOR UPDATE`;
      if (!locked[0]) throw new BadRequestException('This Telegram collectible is not available for withdrawal');
      const gift = await tx.gift.findFirst({ where: { id: giftId, ownerId: userId, status: 'OWNED', telegramOwnedGiftId: { not: null } } });
      if (!gift?.telegramOwnedGiftId) throw new BadRequestException('This Telegram collectible is not available for withdrawal');
      const request = await tx.giftWithdrawalRequest.create({ data: { userId, giftId: gift.id, code: requestCode, status: 'PENDING' } });
      await tx.gift.update({ where: { id: gift.id }, data: { status: 'WITHDRAW_PENDING' } });
      return { gift, requestId: request.id };
    });
    const { gift, requestId } = reserved;
    if (!gift?.telegramOwnedGiftId) throw new BadRequestException('This Telegram collectible is not available for withdrawal');
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { telegramId: true, telegramAccessHash: true, username: true } });
    const giftData = gift.telegramGiftData as { savedId?: string; msgId?: number } | null;
    const reference = giftData?.savedId
      ? new Api.InputSavedStarGiftChat({ peer: await client.getInputEntity('me'), savedId: bigInt(giftData.savedId) })
      : giftData?.msgId
        ? new Api.InputSavedStarGiftUser({ msgId: giftData.msgId })
        : null;
    if (!reference) throw new BadRequestException('The Telegram gift reference is missing');
    let recipient: any;
    try {
      recipient = user.username
        ? await client.getInputEntity(user.username)
        : user.telegramAccessHash
          ? new Api.InputPeerUser({ userId: bigInt(user.telegramId), accessHash: bigInt(user.telegramAccessHash) })
          : await client.getInputEntity(Number(user.telegramId));
      await client.invoke(new Api.payments.TransferStarGift({ stargift: reference, toId: recipient }));
    } catch (error) {
      const message = this.errorText(error);
      const outcomeUnknown = /timeout|network|connection|socket|econn|rpc_call_fail/i.test(message);
      await this.prisma.$transaction(async (tx) => {
        if (!outcomeUnknown) await tx.gift.updateMany({ where: { id: gift.id, status: 'WITHDRAW_PENDING' }, data: { status: 'OWNED' } });
        await tx.giftWithdrawalRequest.update({ where: { id: requestId }, data: { status: outcomeUnknown ? 'REVIEW' : 'FAILED' } });
      });
      if (outcomeUnknown) throw new ConflictException('Telegram did not confirm whether the gift transfer completed. The gift is held safely while the transfer is checked.');
      if (/PAYMENT_REQUIRED|TRANSFER_STARS|STARGIFT_TRANSFER_TOO_EARLY/i.test(message)) {
        throw new ConflictException('Telegram requires a transfer fee or cooldown for this gift. It remains in your ORBIT inventory.');
      }
      this.logger.warn(`Telegram gift transfer failed for ${gift.id}: ${message}`);
      throw new ServiceUnavailableException('Telegram could not transfer this gift. It remains in your ORBIT inventory.');
    }
    await this.prisma.$transaction(async (tx) => {
      await tx.gift.update({ where: { id: gift.id }, data: { status: 'WITHDRAWN', ownerId: null } });
      await tx.giftWithdrawalRequest.update({ where: { id: requestId }, data: { status: 'CONFIRMED', confirmedAt: new Date() } });
    });
    return { status: 'SENT', giftId: gift.id };
  }

  private async syncIncomingGifts() {
    const client = this.client;
    if (!client || this.syncing) return;
    this.syncing = true;
    try {
      const state = await this.prisma.telegramRelayState.findUnique({ where: { id: 'orbit-relay' } });
      if (!state) return;
      let offset = '';
      for (let page = 0; page < 20; page++) {
        const result = await client.invoke(new Api.payments.GetSavedStarGifts({
          peer: 'me', excludeUnsaved: false, excludeSaved: false, excludeUnique: false,
          excludeHosted: true, offset, limit: 100,
        })) as TelegramEntity;
        for (const saved of (result.gifts ?? []) as TelegramEntity[]) await this.importIncomingGift(saved, result.users ?? [], state.initialSyncAt);
        if (!result.nextOffset) break;
        offset = result.nextOffset;
      }
    } finally { this.syncing = false; }
  }

  private async connectRelay() {
    if (this.client || this.connecting) return;
    const apiId = Number(process.env.TELEGRAM_API_ID);
    const apiHash = process.env.TELEGRAM_API_HASH?.trim();
    const session = process.env.TELEGRAM_RELAY_SESSION?.trim();
    if (!Number.isSafeInteger(apiId) || apiId <= 0 || !apiHash || !session) return;
    this.connecting = true;
    try {
      const client = new TelegramClient(new StringSession(session), apiId, apiHash, { connectionRetries: 5 });
      await client.connect();
      if (!await client.checkAuthorization()) {
        await client.disconnect();
        this.logger.error('Telegram relay session is not authorized; renew TELEGRAM_RELAY_SESSION.');
        return;
      }
      this.client = client;
      await this.prisma.telegramRelayState.upsert({ where: { id: 'orbit-relay' }, update: {}, create: { id: 'orbit-relay', initialSyncAt: new Date() } });
      await this.syncIncomingGifts();
      this.logger.log('Telegram relay connected through MTProto.');
    } catch (error) {
      this.logger.error(`Telegram relay could not connect: ${this.errorText(error)}`);
    } finally {
      this.connecting = false;
    }
  }

  private async importIncomingGift(saved: TelegramEntity, users: TelegramEntity[], initialSyncAt: Date) {
    const gift: TelegramEntity = saved.gift ?? {};
    if (gift.className !== 'StarGiftUnique' || !saved.fromId || saved.date * 1000 < initialSyncAt.getTime()) return;
    const senderId = saved.fromId.userId?.toString();
    if (!senderId) return;
    const savedId = saved.savedId?.toString();
    const msgId = typeof saved.msgId === 'number' ? saved.msgId : undefined;
    const externalId = savedId ? `saved:${savedId}` : msgId ? `msg:${msgId}` : null;
    if (!externalId) return;
    const existing = await this.prisma.gift.findUnique({ where: { telegramOwnedGiftId: externalId }, select: { id: true } });
    if (existing) return;

    const sender = (users as TelegramEntity[]).find((item) => item.id?.toString() === senderId);
    const user = await this.prisma.user.upsert({
      where: { telegramId: senderId },
      update: { username: sender?.username ?? undefined, firstName: sender?.firstName ?? undefined, lastName: sender?.lastName ?? undefined, telegramAccessHash: sender?.accessHash?.toString() ?? undefined },
      create: { telegramId: senderId, username: sender?.username, firstName: sender?.firstName, lastName: sender?.lastName, telegramAccessHash: sender?.accessHash?.toString() },
    });
    const attributes = Array.isArray(gift.attributes) ? gift.attributes as TelegramEntity[] : [];
    const model = attributes.find((value) => value.className === 'StarGiftAttributeModel')?.name;
    const symbol = attributes.find((value) => value.className === 'StarGiftAttributePattern')?.name;
    const backdrop = attributes.find((value) => value.className === 'StarGiftAttributeBackdrop')?.name;
    const name = gift.title || gift.name || gift.slug || 'Telegram Gift';
    const number = saved.giftNum ?? gift.number ?? null;
    const slug = typeof gift.slug === 'string' ? gift.slug : `${String(name).toLowerCase().replace(/[^a-z0-9]+/g, '')}-${number ?? ''}`;
    const mappedValue = this.getConfiguredGiftValue(slug, String(name));
    await this.prisma.gift.create({ data: {
      name: `${name}${number ? ` #${number}` : ''}`,
      collection: String(name),
      emoji: '🎁',
      priceTon: mappedValue,
      status: 'OWNED',
      ownerId: user.id,
      telegramOwnedGiftId: externalId,
      telegramGiftNumber: number ? String(number) : null,
      imageUrl: `https://nft.fragment.com/gift/${slug}.webp`,
      backdropName: backdrop ?? null,
      symbolName: [model, symbol].filter(Boolean).join(' · ') || null,
      telegramGiftData: { savedId: savedId ?? null, msgId: msgId ?? null, slug, attributes },
    } });
    const pendingIntent = await this.prisma.giftDepositIntent.findFirst({ where: { userId: user.id, status: 'PENDING' }, orderBy: { createdAt: 'asc' } });
    if (pendingIntent) await this.prisma.giftDepositIntent.update({ where: { id: pendingIntent.id }, data: { status: 'CONFIRMED', giftId: (await this.prisma.gift.findUniqueOrThrow({ where: { telegramOwnedGiftId: externalId }, select: { id: true } })).id, confirmedAt: new Date() } });
  }

  private getConfiguredGiftValue(slug: string, name: string) {
    const valueMap = process.env.TELEGRAM_GIFT_VALUES_JSON;
    if (!valueMap) return '0';
    try {
      const values = JSON.parse(valueMap) as Record<string, string | number>;
      const value = values[slug] ?? values[name];
      return value !== undefined && /^\d+(\.\d{1,9})?$/.test(String(value)) ? String(value) : '0';
    } catch { return '0'; }
  }

  private errorText(error: unknown) { return error instanceof Error ? error.message : String(error); }
}
