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

const GIVEAWAY_ID = 'eternal-rose-2026-10';
const CHANNEL_USERNAME = '@orbit_market_official';
const PARTICIPANT_LIMIT = 10;
const REFERRAL_WEIGHT_BONUS = 10;
const REVIEW_PENDING = 'PENDING';
const REVIEW_APPROVED = 'APPROVED';
const REVIEW_REJECTED = 'REJECTED';

type TelegramUpdate = {
  callback_query?: {
    id: string;
    data?: string;
    from: { id: number };
    message?: { chat: { id: number }; message_id: number };
  };
};

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
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED } }),
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED, referredByUserId: user.id } }),
      this.countReferralVisits(user.id),
      this.getWinner(),
      this.getReferralLink(user.id),
    ]);
    return {
      entered: entry?.reviewStatus === REVIEW_APPROVED,
      applicationStatus: entry?.reviewStatus ?? null,
      participants, winner,
      full: Boolean(winner) || participants >= PARTICIPANT_LIMIT,
      referralLink, referralCount, referralVisitCount,
      referralBonusPercent: referralCount * REFERRAL_WEIGHT_BONUS,
    };
  }

  @Post('rose/enter')
  async enter(
    @Headers('x-telegram-init-data') initData?: string,
    @Headers('x-rose-referral-code') referralCode?: string,
    @Body() body?: { profileConditionConfirmed?: boolean },
  ) {
    const user = await this.getUser(initData);
    if (body?.profileConditionConfirmed !== true) throw new BadRequestException('Confirm the Telegram profile condition before entering');
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
      if (existing?.reviewStatus === REVIEW_APPROVED || existing?.reviewStatus === REVIEW_PENDING) {
        const count = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED } });
        const winnerEntry = await tx.giveawayEntry.findFirst({
          where: { giveaway: GIVEAWAY_ID, winner: true },
          include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } },
        });
        return { entered: existing.reviewStatus === REVIEW_APPROVED, applicationStatus: existing.reviewStatus, entryId: existing.id, participants: count, winner: this.publicWinner(winnerEntry), full: Boolean(winnerEntry) || count >= PARTICIPANT_LIMIT, created: false };
      }

      const count = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED } });
      if (count >= PARTICIPANT_LIMIT) {
        const winnerEntry = await tx.giveawayEntry.findFirst({
          where: { giveaway: GIVEAWAY_ID, winner: true },
          include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } },
        });
        return { entered: false, applicationStatus: existing?.reviewStatus ?? null, entryId: existing?.id ?? null, participants: count, winner: this.publicWinner(winnerEntry), full: true, created: false };
      }

      const entry = existing
        ? await tx.giveawayEntry.update({ where: { id: existing.id }, data: { reviewStatus: REVIEW_PENDING, referredByUserId: referrerId, winner: false } })
        : await tx.giveawayEntry.create({ data: { giveaway: GIVEAWAY_ID, userId: user.id, referredByUserId: referrerId, reviewStatus: REVIEW_PENDING } });
      return { entered: false, applicationStatus: REVIEW_PENDING, entryId: entry.id, participants: count, winner: await this.publicWinner(await tx.giveawayEntry.findFirst({ where: { giveaway: GIVEAWAY_ID, winner: true }, include: { user: { select: { username: true, firstName: true, lastName: true, photoUrl: true } } } })), full: false, created: true };
    });
    if (result.full && !result.entryId) throw new BadRequestException('The rose giveaway is full');
    if (result.created && result.entryId) {
      try {
        await this.notifyAdmins(user, result.entryId);
      } catch (error) {
        await this.prisma.giveawayEntry.deleteMany({ where: { id: result.entryId, reviewStatus: REVIEW_PENDING } });
        throw error;
      }
    }
    const [referralCount, referralVisitCount, ownReferralLink] = await Promise.all([
      this.prisma.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED, referredByUserId: user.id } }),
      this.countReferralVisits(user.id),
      this.getReferralLink(user.id),
    ]);
    return {
      ...result, referralLink: ownReferralLink, referralCount, referralVisitCount,
      referralBonusPercent: referralCount * REFERRAL_WEIGHT_BONUS,
    };
  }

  @Post('telegram-updates')
  @HttpCode(200)
  async telegramUpdates(
    @Headers('x-telegram-bot-api-secret-token') secret?: string,
    @Body() update?: TelegramUpdate,
  ) {
    const expectedSecret = this.config.get<string>('TELEGRAM_WEBHOOK_SECRET')?.trim();
    if (!expectedSecret || secret !== expectedSecret) throw new UnauthorizedException();
    const callback = update?.callback_query;
    if (!callback?.data?.startsWith('rose:')) return { ok: true };

    const adminIds = await this.getGiveawayAdminTelegramIds();
    if (!adminIds.has(String(callback.from.id))) {
      await this.answerCallback(callback.id, 'Not authorized');
      return { ok: true };
    }

    const [, action, entryId] = callback.data.split(':');
    if (!entryId || (action !== 'approve' && action !== 'reject')) {
      await this.answerCallback(callback.id, 'Invalid action');
      return { ok: true };
    }

    const decision = await this.reviewEntry(entryId, action === 'approve');
    const message = decision === 'APPROVED'
      ? '✅ Giveaway application approved'
      : decision === 'FULL' ? 'The giveaway already has 10 approved participants' : '❌ Giveaway application rejected';
    await this.answerCallback(callback.id, message);
    if (callback.message) {
      await this.telegramRequest('editMessageText', {
        chat_id: callback.message.chat.id,
        message_id: callback.message.message_id,
        text: `${message}\nApplication: ${entryId}`,
        reply_markup: { inline_keyboard: [] },
      }).catch(() => undefined);
    }
    return { ok: true };
  }

  private async notifyAdmins(user: { id: string; telegramId: string; username: string | null; firstName: string | null; lastName: string | null }, entryId: string) {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) throw new ServiceUnavailableException('Telegram bot is not configured to notify giveaway admins');
    const adminIds = await this.getGiveawayAdminTelegramIds();
    if (adminIds.size === 0) throw new ServiceUnavailableException('Giveaway admins must open the ORBIT bot before receiving review requests');

    const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Telegram user';
    const label = user.username ? `@${user.username}` : `${displayName} · ID ${user.telegramId}`;
    const text = `🌹 ORBIT giveaway application\n\nUser: ${label}\nName: ${displayName}\nTelegram ID: ${user.telegramId}\n\nCondition 1: channel subscription verified.\nCondition 2: user confirmed the profile requirement.\nPlease review the entry:`;
    const results = await Promise.all([...adminIds].map(async (chatId) => {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          reply_markup: { inline_keyboard: [[
            { text: '✅ Approve', callback_data: `rose:approve:${entryId}` },
            { text: '✖️ Reject', callback_data: `rose:reject:${entryId}` },
          ]] },
        }),
        signal: AbortSignal.timeout(8_000),
      }).then(async (res) => res.ok && Boolean((await res.json() as { ok?: boolean }).ok)).catch(() => false);
      return response;
    }));
    if (results.every((sent) => !sent)) throw new ServiceUnavailableException('Could not deliver the giveaway review request to the admins');
  }

  private async getGiveawayAdminTelegramIds() {
    const configured = this.config.get<string>('GIVEAWAY_ADMIN_USERNAMES') ?? 'maxhqdI,progcoder';
    const usernames = new Set(configured.split(',').map((name) => name.trim().replace(/^@/, '').toLowerCase()).filter(Boolean));
    if (usernames.size === 0) return new Set<string>();
    const users = await this.prisma.user.findMany({ select: { username: true, telegramId: true } });
    return new Set(users.filter((user) => user.username && usernames.has(user.username.toLowerCase())).map((user) => user.telegramId));
  }

  private async reviewEntry(entryId: string, approve: boolean) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${GIVEAWAY_ID}))::text AS locked`;
      const entry = await tx.giveawayEntry.findFirst({ where: { id: entryId, giveaway: GIVEAWAY_ID } });
      if (!entry || entry.reviewStatus !== REVIEW_PENDING) return entry?.reviewStatus ?? REVIEW_REJECTED;
      const approvedCount = await tx.giveawayEntry.count({ where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED } });
      if (approve && approvedCount >= PARTICIPANT_LIMIT) {
        await tx.giveawayEntry.update({ where: { id: entry.id }, data: { reviewStatus: REVIEW_REJECTED } });
        return 'FULL';
      }
      if (!approve) {
        await tx.giveawayEntry.update({ where: { id: entry.id }, data: { reviewStatus: REVIEW_REJECTED } });
        return REVIEW_REJECTED;
      }

      await tx.giveawayEntry.update({ where: { id: entry.id }, data: { reviewStatus: REVIEW_APPROVED } });
      const participants = approvedCount + 1;
      if (participants === PARTICIPANT_LIMIT) {
        const entries = await tx.giveawayEntry.findMany({
          where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED },
          select: { id: true, userId: true },
          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        });
        const weights = await Promise.all(entries.map(async (approvedEntry) => ({
          ...approvedEntry,
          weight: REFERRAL_WEIGHT_BONUS + await tx.giveawayEntry.count({
            where: { giveaway: GIVEAWAY_ID, reviewStatus: REVIEW_APPROVED, referredByUserId: approvedEntry.userId },
          }),
        })));
        const totalWeight = weights.reduce((sum, approvedEntry) => sum + approvedEntry.weight, 0);
        let draw = randomInt(totalWeight);
        let selected = weights[0];
        for (const approvedEntry of weights) {
          if (draw < approvedEntry.weight) { selected = approvedEntry; break; }
          draw -= approvedEntry.weight;
        }
        await tx.giveawayEntry.update({ where: { id: selected.id }, data: { winner: true } });
      }
      return REVIEW_APPROVED;
    });
  }

  private async answerCallback(callbackId: string, text: string) {
    await this.telegramRequest('answerCallbackQuery', { callback_query_id: callbackId, text }).catch(() => undefined);
  }

  private async telegramRequest(method: string, payload: Record<string, unknown>) {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) throw new ServiceUnavailableException('Telegram bot is not configured');
    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`Telegram ${method} failed`);
    const result = await response.json() as { ok?: boolean };
    if (!result.ok) throw new Error(`Telegram ${method} failed`);
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
