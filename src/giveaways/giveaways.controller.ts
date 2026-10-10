import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Post,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, randomInt } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';

const GIVEAWAY_ID = 'eternal-rose-2026-10';
const CHANNEL_USERNAME = '@orbit_market_official';
const PARTICIPANT_LIMIT = 10;
const REFERRAL_WEIGHT_BONUS = 10;

@Controller('giveaways')
export class GiveawaysController {
  private cachedBotUsername: string | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
    private readonly config: ConfigService,
  ) {}

  @Get('rose/status')
  async status(
    @Headers('x-telegram-init-data') initData?: string,
    @Headers('x-rose-referral-code') referralCode?: string,
  ) {
    const user = await this.getUser(initData);
    if (referralCode) await this.recordReferralVisit(user.id, referralCode);
    const [entry, participants, referralCount, referralVisitCount, winner, referralLink] = await Promise.all([
      this.prisma.giveawayEntry.findUnique({ where: { giveaway_userId: { giveaway: GIVEAWAY_ID, userId: user.id } } }),
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID } }),
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, referredByUserId: user.id } }),
      this.countReferralVisits(user.id),
      this.getWinner(),
      this.getReferralLink(user.id),
    ]);
    return {
      entered: Boolean(entry), participants, winner,
      full: Boolean(winner) || participants >= PARTICIPANT_LIMIT,
      referralLink, referralCount, referralVisitCount,
      referralBonusPercent: referralCount * REFERRAL_WEIGHT_BONUS,
    };
  }

  @Post('rose/enter')
  async enter(
    @Headers('x-telegram-init-data') initData?: string,
    @Headers('x-rose-referral-code') referralCode?: string,
  ) {
    const user = await this.getUser(initData);
    const isMember = await this.isSubscribed(user.telegramId);
    if (!isMember) throw new BadRequestException(`Subscribe to ${CHANNEL_USERNAME} before entering`);
    const referrerId = referralCode
      ? await this.recordReferralVisit(user.id, referralCode)
      : await this.getRecordedReferrerId(user.id);

    const result = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${GIVEAWAY_ID}))::text AS locked`;
      const existing = await tx.giveawayEntry.findUnique({
        where: { giveaway_userId: { giveaway: GIVEAWAY_ID, userId: user.id } },
      });
      if (existing) {
        const count = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID } });
        const winnerEntry = await tx.giveawayEntry.findFirst({
          where: { giveaway: GIVEAWAY_ID, winner: true },
          include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } },
        });
        return { entered: true, participants: count, winner: this.publicWinner(winnerEntry), full: Boolean(winnerEntry) || count >= PARTICIPANT_LIMIT };
      }

      const count = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID } });
      if (count >= PARTICIPANT_LIMIT) {
        const winnerEntry = await tx.giveawayEntry.findFirst({
          where: { giveaway: GIVEAWAY_ID, winner: true },
          include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } },
        });
        return { entered: false, participants: count, winner: this.publicWinner(winnerEntry), full: true };
      }

      await tx.giveawayEntry.create({ data: { giveaway: GIVEAWAY_ID, userId: user.id, referredByUserId: referrerId } });
      const participants = count + 1;
      if (participants === PARTICIPANT_LIMIT) {
        const entries = await tx.giveawayEntry.findMany({
          where: { giveaway: GIVEAWAY_ID },
          select: { id: true, userId: true },
          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        });
        const weights = await Promise.all(entries.map(async (entry) => ({
          ...entry,
          weight: REFERRAL_WEIGHT_BONUS + await tx.giveawayEntry.count({
            where: { giveaway: GIVEAWAY_ID, referredByUserId: entry.userId },
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

      const winnerEntry = await tx.giveawayEntry.findFirst({
        where: { giveaway: GIVEAWAY_ID, winner: true },
        include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } },
      });
      return { entered: true, participants, winner: this.publicWinner(winnerEntry), full: participants >= PARTICIPANT_LIMIT };
    });
    if (!result.entered) throw new BadRequestException('The rose giveaway is full');
    const [referralCount, referralVisitCount, ownReferralLink] = await Promise.all([
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, referredByUserId: user.id } }),
      this.countReferralVisits(user.id),
      this.getReferralLink(user.id),
    ]);
    return {
      ...result, referralLink: ownReferralLink, referralCount, referralVisitCount,
      referralBonusPercent: referralCount * REFERRAL_WEIGHT_BONUS,
    };
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
    return username ? `https://t.me/${username}?startapp=rose_${saved.code}` : null;
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
    return this.publicWinner(entry);
  }

  private publicWinner(entry: { user: { username: string | null; firstName: string | null; lastName: string | null; photoUrl: string | null } } | null) {
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
