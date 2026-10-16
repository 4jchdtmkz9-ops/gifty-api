import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, randomInt } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';
import { StarPaymentsService } from '../payments/star-payments.service.js';

// Referral NFT giveaway — ChillFlame (https://t.me/nft/ChillFlame-447145).
// Conditions (verified server-side): channel subscription, connected wallet,
// and at least 0.1 TON staked in the public Arena. The weighted draw runs
// automatically as soon as the 10th participant enters.
const GIVEAWAY_ID = 'nft-chillflame-2026-10';
const CHANNEL_USERNAME = '@orbit_market_official';
const PARTICIPANT_LIMIT = 10;
const REFERRAL_WEIGHT_BONUS = 10;
const ARENA_MIN_TON = 0.1;
const ENTRY_APPROVED = 'APPROVED';

type TelegramUpdate = {
  pre_checkout_query?: {
    id: string;
    from: { id: number };
    currency?: string;
    total_amount?: number;
    invoice_payload?: string;
  };
  message?: {
    message_id: number;
    from?: { id: number };
    successful_payment?: {
      currency?: string;
      total_amount?: number;
      invoice_payload?: string;
      telegram_payment_charge_id?: string;
      provider_payment_charge_id?: string;
    };
  };
};

@Controller('giveaways')
export class GiveawaysController {
  private cachedBotUsername: string | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
    private readonly config: ConfigService,
    private readonly stars: StarPaymentsService,
  ) {}

  @Get('nft/status')
  async status(
    @Headers('x-telegram-init-data') initData?: string,
    @Headers('x-giveaway-referral-code') referralCode?: string,
  ) {
    const user = await this.getUser(initData);
    if (referralCode) await this.recordReferralVisit(user.id, referralCode);
    return this.currentState(user);
  }

  @Post('nft/enter')
  async enter(
    @Headers('x-telegram-init-data') initData?: string,
    @Headers('x-giveaway-referral-code') referralCode?: string,
  ) {
    const user = await this.getUser(initData);

    // Every condition is re-checked server-side at the moment of entering.
    const subscribed = await this.isSubscribed(user.telegramId);
    const { walletConnected, arenaStake } = await this.walletAndArena(user.id);
    if (!subscribed) throw new BadRequestException(`Subscribe to ${CHANNEL_USERNAME} before entering`);
    if (!walletConnected) throw new BadRequestException('Connect your wallet on the site or in the bot before entering');
    if (!arenaStake) throw new BadRequestException(`Bet at least ${ARENA_MIN_TON} TON in the Arena before entering`);

    const referrerId = referralCode
      ? await this.recordReferralVisit(user.id, referralCode)
      : await this.getRecordedReferrerId(user.id);

    await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${GIVEAWAY_ID}))::text AS locked`;
      const existing = await tx.giveawayEntry.findUnique({
        where: { giveaway_userId: { giveaway: GIVEAWAY_ID, userId: user.id } },
      });
      if (!existing) {
        const count = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: ENTRY_APPROVED } });
        if (count >= PARTICIPANT_LIMIT) throw new BadRequestException(`The giveaway already has its ${PARTICIPANT_LIMIT} participants`);
        await tx.giveawayEntry.create({
          data: { giveaway: GIVEAWAY_ID, userId: user.id, referredByUserId: referrerId, reviewStatus: ENTRY_APPROVED },
        });
      }

      // The draw fires on the 10th approved participant (idempotent).
      const participants = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: ENTRY_APPROVED } });
      const drawn = await tx.giveawayEntry.findFirst({ where: { giveaway: GIVEAWAY_ID, winner: true }, select: { id: true } });
      if (!drawn && participants >= PARTICIPANT_LIMIT) {
        const entries = await tx.giveawayEntry.findMany({
          where: { giveaway: GIVEAWAY_ID, reviewStatus: ENTRY_APPROVED },
          select: { id: true, userId: true },
          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        });
        const weights = await Promise.all(entries.map(async (entry) => ({
          ...entry,
          weight: REFERRAL_WEIGHT_BONUS + await tx.giveawayEntry.count({
            where: { giveaway: GIVEAWAY_ID, reviewStatus: ENTRY_APPROVED, referredByUserId: entry.userId },
          }),
        })));
        const totalWeight = weights.reduce((sum, entry) => sum + entry.weight, 0);
        let draw = randomInt(totalWeight);
        let selected = weights[0];
        for (const entry of weights) {
          if (draw < entry.weight) { selected = entry; break; }
          draw -= entry.weight;
        }
        await tx.giveawayEntry.update({ where: { id: selected.id }, data: { winner: true } });
      }
    });

    return this.currentState(user);
  }

  @Post('telegram-updates')
  @HttpCode(200)
  async telegramUpdates(
    @Headers('x-telegram-bot-api-secret-token') secret?: string,
    @Body() update?: TelegramUpdate,
  ) {
    const expectedSecret = this.config.get<string>('TELEGRAM_WEBHOOK_SECRET')?.trim();
    if (!expectedSecret || secret !== expectedSecret) throw new UnauthorizedException();
    if (update?.pre_checkout_query) {
      await this.stars.answerPreCheckout(update.pre_checkout_query);
      return { ok: true };
    }
    if (update?.message?.successful_payment) {
      await this.stars.confirmSuccessfulPayment(update.message.successful_payment);
      return { ok: true };
    }
    return { ok: true };
  }

  private async currentState(user: { id: string; telegramId: string }) {
    const [entry, participants, referralCount, referralVisitCount, winner, referralLink, walletConnected, arenaStake] = await Promise.all([
      this.prisma.giveawayEntry.findUnique({ where: { giveaway_userId: { giveaway: GIVEAWAY_ID, userId: user.id } } }),
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: ENTRY_APPROVED } }),
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: ENTRY_APPROVED, referredByUserId: user.id } }),
      this.countReferralVisits(user.id),
      this.getWinner(),
      this.getReferralLink(user.id),
      this.prisma.wallet.findFirst({ where: { userId: user.id, isConnected: true }, select: { id: true } }),
      this.prisma.pvpParticipant.findFirst({
        where: { userId: user.id, cashStakeGram: { gte: ARENA_MIN_TON }, room: { isPublic: true } },
        select: { id: true },
      }),
    ]);
    return {
      entered: Boolean(entry),
      participants,
      winner,
      full: Boolean(winner) || participants >= PARTICIPANT_LIMIT,
      conditions: {
        // Degrades to false when the bot cannot verify membership (same as FREE case).
        subscribed: await this.isSubscribed(user.telegramId).catch(() => false),
        walletConnected: Boolean(walletConnected),
        arenaStake: Boolean(arenaStake),
      },
      referralLink,
      referralCount,
      referralVisitCount,
      referralBonusPercent: referralCount * REFERRAL_WEIGHT_BONUS,
    };
  }

  private async walletAndArena(userId: string) {
    const [connectedWallet, arenaBet] = await Promise.all([
      this.prisma.wallet.findFirst({ where: { userId, isConnected: true }, select: { id: true } }),
      this.prisma.pvpParticipant.findFirst({
        where: { userId, cashStakeGram: { gte: ARENA_MIN_TON }, room: { isPublic: true } },
        select: { id: true },
      }),
    ]);
    return { walletConnected: Boolean(connectedWallet), arenaStake: Boolean(arenaBet) };
  }

  private async recordReferralVisit(inviteeUserId: string, referralCode?: string) {
    if (referralCode) {
      const link = await this.prisma.giveawayReferralLink.findUnique({ where: { code: referralCode }, select: { userId: true } });
      if (link && link.userId !== inviteeUserId) {
        await this.prisma.$executeRaw`
          INSERT INTO "GiveawayReferralVisit" ("giveaway", "inviteeUserId", "referrerUserId")
          VALUES (${GIVEAWAY_ID}, ${inviteeUserId}, ${link.userId})
          ON CONFLICT ("giveaway", "inviteeUserId") DO NOTHING
        `;
      }
    }
    return this.getRecordedReferrerId(inviteeUserId);
  }

  private async getRecordedReferrerId(inviteeUserId: string) {
    const visit = await this.prisma.$queryRaw<Array<{ referrerUserId: string }>>`
      SELECT "referrerUserId" FROM "GiveawayReferralVisit"
      WHERE "giveaway" = ${GIVEAWAY_ID} AND "inviteeUserId" = ${inviteeUserId}
      LIMIT 1
    `;
    return visit[0]?.referrerUserId ?? null;
  }

  private async countReferralVisits(referrerUserId: string) {
    const rows = await this.prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*)::int AS count FROM "GiveawayReferralVisit"
      WHERE "giveaway" = ${GIVEAWAY_ID} AND "referrerUserId" = ${referrerUserId}
    `;
    return rows[0]?.count ?? 0;
  }

  private async getReferralLink(userId: string) {
    const saved = await this.prisma.giveawayReferralLink.upsert({
      where: { giveaway_userId: { giveaway: GIVEAWAY_ID, userId } },
      update: {},
      create: { giveaway: GIVEAWAY_ID, userId, code: randomBytes(12).toString('base64url') },
      select: { code: true },
    });
    const username = await this.telegramBotUsername();
    return username ? `https://t.me/${username}?startapp=nft_${saved.code}` : null;
  }

  private async telegramBotUsername() {
    if (this.cachedBotUsername) return this.cachedBotUsername;
    const configured = this.config.get<string>('TELEGRAM_BOT_USERNAME')?.replace(/^@/, '').trim();
    if (configured) {
      this.cachedBotUsername = configured;
      return configured;
    }
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) return null;
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/getMe`, { signal: AbortSignal.timeout(5_000) });
      const result = await response.json() as { ok?: boolean; result?: { username?: string } };
      if (!response.ok || !result.ok || !result.result?.username) return null;
      this.cachedBotUsername = result.result.username;
      return this.cachedBotUsername;
    } catch {
      return null;
    }
  }

  private async getWinner() {
    const entry = await this.prisma.giveawayEntry.findFirst({
      where: { giveaway: GIVEAWAY_ID, winner: true },
      include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } },
    });
    if (!entry) return null;
    return {
      username: entry.user.username,
      firstName: entry.user.firstName,
      lastName: entry.user.lastName,
      photoUrl: entry.user.photoUrl,
    };
  }

  private async getUser(initData?: string) {
    if (!initData) throw new UnauthorizedException('Open ORBIT inside Telegram to enter');
    const telegramUser = this.telegramAuth.validateInitData(initData);
    return this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: {
        username: telegramUser.username ?? null,
        firstName: telegramUser.first_name ?? null,
        lastName: telegramUser.last_name ?? null,
        photoUrl: typeof telegramUser.photo_url === 'string' && telegramUser.photo_url.startsWith('https://') ? telegramUser.photo_url : null,
      },
      create: {
        telegramId: String(telegramUser.id),
        username: telegramUser.username ?? null,
        firstName: telegramUser.first_name ?? null,
        lastName: telegramUser.last_name ?? null,
        photoUrl: typeof telegramUser.photo_url === 'string' && telegramUser.photo_url.startsWith('https://') ? telegramUser.photo_url : null,
      },
    });
  }

  private async isSubscribed(telegramId: string) {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) throw new ServiceUnavailableException('Subscription verification is not configured');

    let response: Response;
    try {
      response = await fetch(`https://api.telegram.org/bot${token}/getChatMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHANNEL_USERNAME, user_id: telegramId }),
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
      throw new ServiceUnavailableException('The ORBIT bot must be an administrator of @orbit_market_official to verify subscriptions.');
    }

    const { status, is_member: isMember } = result.result;
    return status === 'creator' || status === 'administrator' || status === 'member' || (status === 'restricted' && isMember === true);
  }
}
