import { BadRequestException, Body, ConflictException, Controller, Get, Headers, Post, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, randomInt } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';
import { FREE_CASE_COLLECTION, FREE_CASE_NFT_ID } from './free-case.constants.js';

const LUCKY_REWARDS = [
  { id: 'gram-01', name: 'GRAM', valueGram: '0.1', chance: 22, kind: 'gram' },
  { id: 'gram-02', name: 'GRAM', valueGram: '0.2', chance: 28, kind: 'gram' },
  { id: 'gram-05', name: 'GRAM', valueGram: '0.5', chance: 30, kind: 'gram' },
  { id: 'gram-1', name: 'GRAM', valueGram: '1', chance: 15, kind: 'gram' },
  { id: 'gram-6', name: 'GRAM', valueGram: '6', chance: 5, kind: 'gram' },
  { id: 'gram-7999', name: 'GRAM', valueGram: '7999', chance: 0, kind: 'gram' },
] as const;

function choose<T extends { chance: number }>(rewards: readonly T[]) {
  const total = rewards.reduce((sum, reward) => sum + reward.chance, 0);
  let ticket = randomInt(total);
  for (const reward of rewards) {
    if (ticket < reward.chance) return reward;
    ticket -= reward.chance;
  }
  return rewards[rewards.length - 1];
}

function validRequestId(value: string | undefined) {
  if (!value || !/^[a-zA-Z0-9_-]{16,80}$/.test(value)) throw new BadRequestException('A valid request id is required');
  return value;
}

const CRYPTAN_PRICE_GRAM = '30';
const CRYPTAN_REWARDS = [
  { id: 'bigyear-26647', name: 'Big Year', valueGram: '5.5', chance: 50_000 },
  { id: 'whipcupcake-180322', name: 'Whip Cupcake', valueGram: '9', chance: 45_000 },
  { id: 'inputkey-11258', name: 'Input Key', valueGram: '18', chance: 4_499 },
  { id: 'surgeboard-22018', name: 'Surge Board', valueGram: '60', chance: 500 },
  { id: 'nailbracelet-3267', name: 'Nail Bracelet', valueGram: '250', chance: 1 },
] as const;

function chooseCryptanReward() {
  const total = CRYPTAN_REWARDS.reduce((sum, reward) => sum + reward.chance, 0);
  let ticket = randomInt(total);
  for (const reward of CRYPTAN_REWARDS) {
    if (ticket < reward.chance) return reward;
    ticket -= reward.chance;
  }
  return CRYPTAN_REWARDS[CRYPTAN_REWARDS.length - 1];
}

type CryptanRewardDetails = Pick<typeof CRYPTAN_REWARDS[number], 'id' | 'name' | 'valueGram'>;

function publicCryptanReward(reward: CryptanRewardDetails) {
  return { id: reward.id, name: reward.name, valueGram: reward.valueGram, kind: 'gram' as const };
}

@Controller('games')
export class GamesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('lucky/spin')
  async spinLucky(@Body() body: { initData?: string; requestId?: string }) {
    const user = await this.getUser(body.initData);
    const requestId = validRequestId(body.requestId);
    const reference = `lucky:${user.id}:${requestId}`;
    const previous = await this.prisma.gameTransaction.findUnique({ where: { reference } });
    if (previous?.details) return { reward: previous.details, balanceGram: (await this.balance(user.id)).toString() };

    const reward = choose(LUCKY_REWARDS);
    return this.prisma.$transaction(async (tx) => {
      const debited = await tx.user.updateMany({ where: { id: user.id, balanceGram: { gte: '1' } }, data: { balanceGram: { decrement: '1' } } });
      if (debited.count !== 1) throw new BadRequestException('Insufficient ORBIT balance for a 1 GRAM spin');
      await tx.user.update({ where: { id: user.id }, data: { balanceGram: { increment: reward.valueGram } } });
      await tx.gameTransaction.create({ data: { userId: user.id, game: 'LUCKY', type: 'SETTLEMENT', reference, amountGram: Number(reward.valueGram) - 1, details: reward } });
      const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
      return { reward, balanceGram: balance.balanceGram.toString() };
    });
  }

  @Post('cryptan/open')
  async openCryptan(@Body() body: { initData?: string; requestId?: string }) {
    const user = await this.getUser(body.initData);
    const requestId = validRequestId(body.requestId);
    const reference = `cryptan:${user.id}:${requestId}`;
    const existing = await this.prisma.gameTransaction.findUnique({ where: { reference } });
    if (existing?.details) {
      const details = existing.details as { reward: CryptanRewardDetails };
      return { reward: publicCryptanReward(details.reward), balanceGram: (await this.balance(user.id)).toString() };
    }

    const reward = chooseCryptanReward();
    try {
      return await this.prisma.$transaction(async (tx) => {
        const debited = await tx.user.updateMany({
          where: { id: user.id, balanceGram: { gte: CRYPTAN_PRICE_GRAM } },
          data: { balanceGram: { decrement: CRYPTAN_PRICE_GRAM } },
        });
        if (debited.count !== 1) throw new BadRequestException('Insufficient ORBIT balance for a 30 GRAM case');

        // Until ORBIT has a real Telegram-gift treasury, settle each collectible prize
        // as its displayed GRAM value. The random draw and both balance movements are server-side.
        await tx.user.update({ where: { id: user.id }, data: { balanceGram: { increment: reward.valueGram } } });
        await tx.gameTransaction.create({
          data: {
            userId: user.id,
            game: 'CRYPTAN',
            type: 'SETTLEMENT',
            reference,
            amountGram: Number(reward.valueGram) - Number(CRYPTAN_PRICE_GRAM),
            details: {
              reward: { id: reward.id, name: reward.name, valueGram: reward.valueGram },
              priceGram: CRYPTAN_PRICE_GRAM,
              payoutGram: reward.valueGram,
            },
          },
        });
        const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
        return { reward: publicCryptanReward(reward), balanceGram: balance.balanceGram.toString() };
      });
    } catch (error) {
      // A network retry may race with the first request. Return its committed result
      // instead of charging twice; failed/insufficient-balance requests have no row.
      const committed = await this.prisma.gameTransaction.findUnique({ where: { reference } });
      if (committed?.details) {
        const details = committed.details as { reward: CryptanRewardDetails };
        return { reward: publicCryptanReward(details.reward), balanceGram: (await this.balance(user.id)).toString() };
      }
      throw error;
    }
  }

  @Get('history')
  async history(@Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    const rows = await this.prisma.gameTransaction.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 50 });
    return rows.map(({ amountGram, ...row }) => ({ ...row, amountGram: amountGram.toString() }));
  }

  // ── FREE CASE (24-hour cooldown, no cost) ────────────────────────
  private static readonly FREE_COOLDOWN_MS = 24 * 60 * 60 * 1000;
  private static readonly FREE_CHANNEL_USERNAME = '@orbit_market_official';
  private static readonly FREE_REWARDS = [
    { id: 'gram-0001', name: '0.001 GRAM', valueGram: '0.001', chance: 50_000, kind: 'gram' },
    { id: 'gram-001', name: '0.01 GRAM', valueGram: '0.01', chance: 40_000, kind: 'gram' },
    { id: 'gram-01', name: '0.1 GRAM', valueGram: '0.1', chance: 4_500, kind: 'gram' },
    { id: 'gram-1', name: '1 GRAM', valueGram: '1', chance: 500, kind: 'gram' },
    { id: 'bear', name: 'Telegram Bear', valueGram: '20', chance: 4_800, kind: 'gram' },
    { id: FREE_CASE_NFT_ID, name: 'Candy Cane NFT', valueGram: '20', chance: 200, kind: 'nft' },
  ] as const;

  @Get('free/cooldown')
  async freeCooldown(@Headers('x-telegram-init-data') initData: string) {
    return this.freeStatus(initData);
  }

  @Get('free/status')
  async freeStatus(@Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    const [lastFree, connectedWallet, pendingNftTransaction] = await Promise.all([
      this.prisma.gameTransaction.findFirst({
        where: { userId: user.id, game: 'FREE' },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.wallet.findFirst({ where: { userId: user.id, isConnected: true }, select: { id: true } }),
      this.prisma.gameTransaction.findFirst({
        where: { userId: user.id, game: 'FREE', type: 'NFT_PENDING' },
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    const endsAt = lastFree ? new Date(lastFree.createdAt.getTime() + GamesController.FREE_COOLDOWN_MS) : null;
    const pendingDetails = pendingNftTransaction?.details as { reward?: { id: string; name: string; valueGram: string }; resolution?: string | null } | null;
    return {
      cooldownEndsAt: endsAt && endsAt > new Date() ? endsAt.toISOString() : null,
      walletConnected: Boolean(connectedWallet),
      subscribed: await this.isFreeSubscribed(user.telegramId).catch(() => false),
      pendingNft: pendingNftTransaction && pendingDetails?.reward && !pendingDetails.resolution
        ? { requestId: pendingNftTransaction.reference.slice(`free:${user.id}:`.length), reward: pendingDetails.reward }
        : null,
    };
  }

  @Post('free/open')
  async openFree(@Body() body: { initData?: string; requestId?: string }) {
    const user = await this.getUser(body.initData);
    const requestId = validRequestId(body.requestId);
    const reference = `free:${user.id}:${requestId}`;
    const existing = await this.prisma.gameTransaction.findUnique({ where: { reference } });
    if (existing?.details) return this.publicFreeSettlement(existing, user.id);

    const connectedWallet = await this.prisma.wallet.findFirst({ where: { userId: user.id, isConnected: true }, select: { id: true } });
    if (!connectedWallet) throw new ConflictException('Connect your TON wallet to open the FREE case');
    if (!(await this.isFreeSubscribed(user.telegramId))) {
      throw new ConflictException(`Subscribe to ${GamesController.FREE_CHANNEL_USERNAME} to open the FREE case`);
    }

    // Check 24h cooldown
    const lastFree = await this.prisma.gameTransaction.findFirst({
      where: { userId: user.id, game: 'FREE' },
      orderBy: { createdAt: 'desc' },
    });
    if (lastFree) {
      const cooldownEnd = new Date(lastFree.createdAt.getTime() + GamesController.FREE_COOLDOWN_MS);
      if (cooldownEnd > new Date()) {
        throw new BadRequestException('Free case is on cooldown. Come back later!');
      }
    }

    const reward = choose(GamesController.FREE_REWARDS);
    try {
      return await this.prisma.$transaction(async (tx) => {
        if (reward.kind === 'nft') {
          // The collectible is not converted to GRAM automatically: the player
          // picks a quick sale or claims it into the inventory first.
          await tx.gameTransaction.create({
            data: {
              userId: user.id,
              game: 'FREE',
              type: 'NFT_PENDING',
              reference,
              amountGram: 0,
              details: { reward: { id: reward.id, name: reward.name, valueGram: reward.valueGram }, resolution: null },
            },
          });
        } else {
          await tx.user.update({ where: { id: user.id }, data: { balanceGram: { increment: reward.valueGram } } });
          await tx.gameTransaction.create({
            data: {
              userId: user.id,
              game: 'FREE',
              type: 'SETTLEMENT',
              reference,
              amountGram: Number(reward.valueGram),
              details: { reward: { id: reward.id, name: reward.name, valueGram: reward.valueGram } },
            },
          });
        }
        const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
        return { reward: { id: reward.id, name: reward.name, valueGram: reward.valueGram, kind: reward.kind }, balanceGram: balance.balanceGram.toString() };
      });
    } catch (error) {
      const committed = await this.prisma.gameTransaction.findUnique({ where: { reference } });
      if (committed?.details) return this.publicFreeSettlement(committed, user.id);
      throw error;
    }
  }

  @Post('free/nft-resolve')
  async resolveFreeNft(@Body() body: { initData?: string; requestId?: string; action?: string }) {
    const user = await this.getUser(body.initData);
    const requestId = validRequestId(body.requestId);
    const action = body.action;
    if (action !== 'sell' && action !== 'claim') throw new BadRequestException('Choose a quick sale or claim for the NFT');
    const reference = `free:${user.id}:${requestId}`;
    const transaction = await this.prisma.gameTransaction.findUnique({ where: { reference } });
    const details = transaction?.details as { reward?: { id: string; name: string; valueGram: string }; resolution?: string | null; giftId?: string | null } | null;
    if (!transaction || transaction.type !== 'NFT_PENDING' || details?.reward?.id !== FREE_CASE_NFT_ID) {
      throw new BadRequestException('This FREE case NFT win was not found');
    }
    if (details.resolution) return this.publicFreeSettlement(transaction, user.id);

    if (action === 'sell') {
      return this.prisma.$transaction(async (tx) => {
        const claimed = await tx.gameTransaction.updateMany({
          where: { reference, type: 'NFT_PENDING' },
          data: {
            type: 'SETTLEMENT',
            amountGram: Number(details.reward!.valueGram),
            details: { reward: details.reward, resolution: 'SOLD' },
          },
        });
        if (claimed.count !== 1) return this.publicFreeSettlement(await tx.gameTransaction.findUniqueOrThrow({ where: { reference } }), user.id);
        await tx.user.update({ where: { id: user.id }, data: { balanceGram: { increment: details.reward!.valueGram } } });
        const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
        return { resolution: 'SOLD', balanceGram: balance.balanceGram.toString() };
      });
    }

    return this.prisma.$transaction(async (tx) => {
      const claimed = await tx.gameTransaction.updateMany({
        where: { reference, type: 'NFT_PENDING' },
        data: { details: { reward: details.reward, resolution: 'CLAIMED' } },
      });
      if (claimed.count !== 1) return this.publicFreeSettlement(await tx.gameTransaction.findUniqueOrThrow({ where: { reference } }), user.id);
      const gift = await tx.gift.create({
        data: {
          name: 'Candy Cane',
          collection: FREE_CASE_COLLECTION,
          emoji: '🍬',
          priceTon: details.reward!.valueGram,
          status: 'OWNED',
          ownerId: user.id,
        },
      });
      const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
      return { resolution: 'CLAIMED', gift, balanceGram: balance.balanceGram.toString() };
    });
  }

  private async publicFreeSettlement(transaction: { details: unknown }, userId: string) {
    const details = transaction.details as { reward: { id: string; name: string; valueGram: string }; resolution?: string | null; giftId?: string | null };
    return {
      reward: { ...details.reward, kind: details.reward.id === FREE_CASE_NFT_ID ? ('nft' as const) : ('gram' as const) },
      resolution: details.resolution ?? null,
      balanceGram: (await this.balance(userId)).toString(),
    };
  }

  private async isFreeSubscribed(telegramId: string) {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) throw new ServiceUnavailableException('Subscription verification is not configured');

    let response: Response;
    try {
      response = await fetch(`https://api.telegram.org/bot${token}/getChatMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: GamesController.FREE_CHANNEL_USERNAME, user_id: telegramId }),
        signal: AbortSignal.timeout(8_000),
      });
    } catch {
      throw new ServiceUnavailableException('Could not verify channel membership. Please try again.');
    }

    const result = await response.json().catch(() => null) as {
      ok?: boolean;
      result?: { status?: string; is_member?: boolean };
    } | null;
    if (!response.ok || !result?.ok || !result.result) {
      throw new ServiceUnavailableException('The ORBIT bot must be an administrator of the channel to verify subscriptions.');
    }

    const { status, is_member: isMember } = result.result;
    return status === 'creator' || status === 'administrator' || status === 'member' || (status === 'restricted' && isMember === true);
  }

  private async balance(userId: string) {
    return (await this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { balanceGram: true } })).balanceGram;
  }

  private async getUser(initData?: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const profile = this.telegramAuth.validateInitData(initData);
    return this.prisma.user.upsert({
      where: { telegramId: String(profile.id) },
      update: { username: profile.username ?? null, firstName: profile.first_name ?? null, photoUrl: profile.photo_url?.startsWith('https://') ? profile.photo_url : null },
      create: { telegramId: String(profile.id), username: profile.username ?? null, firstName: profile.first_name ?? null, lastName: profile.last_name ?? null, photoUrl: profile.photo_url?.startsWith('https://') ? profile.photo_url : null },
    });
  }
}
