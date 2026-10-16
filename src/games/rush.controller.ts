import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';

// ── RUSH round math ────────────────────────────────────────────────
// A rocket flight: the multiplier grows exponentially from 1.00 until the
// pre-generated crash point. Betting opens 8s before each flight; the crash
// result stays on screen 4s, then the next round begins.

const BETTING_WINDOW_MS = 8_000;
const CRASH_RESULT_MS = 4_000;
// Doubling roughly every 8 seconds keeps rounds punchy for a mini app.
const GROWTH_PER_MS = Math.LN2 / 8_000;
const MAX_CRASH = 500;
// Owner curve (Oct 2026): 60% of rounds die below 2x, 40% fly past it.
const HIGH_ROUND_SHARE = 0.4;
// Stakes below 10 Stars-equivalent fly a capped round on 70% of bets.
const LOW_STAKE_CAP_STARS = 10;
const LOW_STAKE_CAP_MULTIPLIER = 1.2;
const LOW_STAKE_CAP_CHANCE = 0.7;

const MIN_STARS = 1;
const MAX_STARS = 4_000_000; // payout (stake x500) must fit a Prisma Int
const MIN_GRAM = '0.01';
const MAX_GRAM = '100000';
const MIN_AUTO = 1.1;
const MAX_AUTO = 500;

const NANO = 1_000_000_000n;

function toNano(value: string | number | { toString(): string }) {
  const [whole = '0', fraction = ''] = String(value).split('.');
  return BigInt(whole) * NANO + BigInt((fraction + '000000000').slice(0, 9));
}

function fromNano(value: bigint) {
  const whole = value / NANO;
  const fraction = (value % NANO).toString().padStart(9, '0').replace(/0+$/, '');
  return `${whole}.${fraction || '0'}`;
}

/** Exact Stars GRAM-equivalent, honouring STARS_GRAM_PER_STAR (default 1★ = 0.01 GRAM). */
function starsToGramAmount(stars: number): string {
  const rate = (process.env.STARS_GRAM_PER_STAR ?? '0.01').trim() || '0.01';
  const [whole = '0', fraction = ''] = rate.split('.');
  const scale = fraction.length;
  const product = BigInt(stars) * BigInt(`${whole}${fraction || '0'}`);
  const divisor = 10n ** BigInt(scale);
  const int = product / divisor;
  const rem = (product % divisor).toString().padStart(scale, '0').replace(/0+$/, '');
  return rem ? `${int}.${rem}` : int.toString();
}

/** Exact Stars-per-GRAM rate used for stake-cap equivalence. */
function gramPerStar(): number {
  const rate = (process.env.STARS_GRAM_PER_STAR ?? '0.01').trim() || '0.01';
  const value = Number(rate);
  return Number.isFinite(value) && value > 0 ? value : 0.01;
}

/**
 * Owner curve (Oct 2026): 60% of rounds crash below 2x, 40% fly past it.
 *   P(crash > m) = 0.6 * (2 - m)^2 + 0.4  for 1 <= m < 2
 *   P(crash > m) = 0.8 / m                for m >= 2
 * A fixed cash-out at m >= 2 pays EV 0.8; below 2x EV never exceeds ~1.
 */
export function generateCrashMultiplier() {
  const branch = randomInt(1_000_000_000) / 1_000_000_000;
  const raw = branch < 1 - HIGH_ROUND_SHARE
    ? (() => {
        const u = randomInt(1_000_000_000) / 1_000_000_000;
        return 2 - Math.sqrt(u); // [1, 2), skewed toward quick crashes
      })()
    : (() => {
        const u = randomInt(1_000_000_000) / 1_000_000_000;
        return 2 / Math.max(1e-9, 1 - u); // [2, MAX_CRASH]
      })();
  return Math.min(MAX_CRASH, Math.max(1, Math.floor(raw * 100) / 100));
}

/** Stars-equivalent of a stake, used by the low-stake flight cap. */
export function stakeStarsEquivalent(currency: string, stakeStars: number, stakeGram: string) {
  return currency === 'STARS' ? stakeStars : Math.round(Number(stakeGram) / gramPerStar());
}

/** 70% of sub-10-Star bets fly a capped x1.20 round (owner's rule). */
export function lowStakeCapFor(starsEquivalent: number): number | null {
  if (starsEquivalent >= LOW_STAKE_CAP_STARS) return null;
  return randomInt(1_000_000) / 1_000_000 < LOW_STAKE_CAP_CHANCE ? LOW_STAKE_CAP_MULTIPLIER : null;
}

export function multiplierAt(flyingStartedAt: Date, now: Date) {
  const elapsed = Math.max(0, now.getTime() - flyingStartedAt.getTime());
  return Math.exp(GROWTH_PER_MS * elapsed);
}

export function floor2(value: number) {
  return Math.floor(value * 100) / 100;
}

export function payoutStarsFor(stakeStars: number, multiplierMilli: bigint) {
  return Number((BigInt(stakeStars) * multiplierMilli) / 1000n);
}

export function payoutGramFor(stakeGram: string, multiplierMilli: bigint) {
  return fromNano((toNano(stakeGram) * multiplierMilli) / 1000n);
}

type RushRoundRecord = {
  id: string;
  number: number;
  phase: string;
  crashMultiplier: { toString(): string };
  bettingEndsAt: Date;
  flyingStartedAt: Date | null;
  crashedAt: Date | null;
};

@Injectable()
export class RushRoundEngine {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Advances the single global round chain to match wall-clock time and settles
   * auto-cashouts / losses. Safe to call from both the interval timer and every
   * request: all transitions use guarded updateMany writes.
   */
  async advance(): Promise<void> {
    for (let guard = 0; guard < 8; guard += 1) {
      const round = await this.prisma.rushRound.findFirst({ orderBy: { number: 'desc' } });
      const now = new Date();

      if (!round) {
        await this.createNextRound(1, now);
        return;
      }

      if (round.phase === 'BETTING' && now >= round.bettingEndsAt) {
        const started = await this.prisma.rushRound.updateMany({
          where: { id: round.id, phase: 'BETTING' },
          data: { phase: 'FLYING', flyingStartedAt: round.bettingEndsAt },
        });
        if (started.count === 1) continue;
        return;
      }

      if (round.phase === 'FLYING' && round.flyingStartedAt) {
        const crashMultiplier = Number(round.crashMultiplier.toString());
        const mult = multiplierAt(round.flyingStartedAt, now);
        if (floor2(mult) >= crashMultiplier) {
          await this.crash(round);
          continue;
        }
        await this.processInFlightSettlements(round, mult);
        return;
      }

      if (round.phase === 'CRASHED' && round.crashedAt && now.getTime() >= round.crashedAt.getTime() + CRASH_RESULT_MS) {
        await this.createNextRound(round.number + 1, now);
        continue;
      }

      return;
    }
  }

  private async createNextRound(number: number, now: Date) {
    try {
      await this.prisma.rushRound.create({
        data: {
          number,
          phase: 'BETTING',
          crashMultiplier: generateCrashMultiplier().toFixed(2),
          bettingEndsAt: new Date(now.getTime() + BETTING_WINDOW_MS),
        },
      });
    } catch {
      // A concurrent request already created this round; the caller re-reads state.
    }
    // Rounds tick every ~12s; keep a day of history and drop the rest so the
    // table stays bounded. Bets cascade with their round.
    if (number % 100 === 0) {
      await this.prisma.rushRound.deleteMany({ where: { createdAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) } } }).catch(() => undefined);
    }
  }

  private async crash(round: RushRoundRecord) {
    const crashed = await this.prisma.rushRound.updateMany({
      where: { id: round.id, phase: 'FLYING' },
      data: { phase: 'CRASHED', crashedAt: new Date() },
    });
    if (crashed.count !== 1) return;
    // Any bet still ACTIVE at the crash moment lost its stake.
    await this.prisma.rushBet.updateMany({
      where: { roundId: round.id, status: 'ACTIVE' },
      data: { status: 'LOST' },
    });
  }

  private async processInFlightSettlements(round: RushRoundRecord, currentMultiplier: number) {
    const bets = await this.prisma.rushBet.findMany({
      where: { roundId: round.id, status: 'ACTIVE', autoCashoutAt: { not: null } },
    });
    for (const bet of bets) {
      const target = Number(bet.autoCashoutAt?.toString() ?? '0');
      if (target <= currentMultiplier) {
        await this.settleCashout(bet.id, Math.min(target, floor2(currentMultiplier)));
      }
    }
    // Low-stake caps: these bets die the moment the rocket passes their cap,
    // even though the shared round keeps flying for everyone else.
    const capped = await this.prisma.rushBet.findMany({
      where: { roundId: round.id, status: 'ACTIVE', capMultiplier: { not: null } },
    });
    for (const bet of capped) {
      const cap = Number(bet.capMultiplier?.toString() ?? '0');
      if (cap > 0 && floor2(currentMultiplier) >= cap) {
        await this.prisma.rushBet.updateMany({
          where: { id: bet.id, status: 'ACTIVE' },
          data: { status: 'LOST', cashoutMultiplier: cap.toFixed(2) },
        });
      }
    }
  }

  /** Credits a bet's payout at the given multiplier. Guarded + idempotent. */
  async settleCashout(betId: string, multiplier: number) {
    return this.prisma.$transaction(async (tx) => {
      const bet = await tx.rushBet.findUnique({ where: { id: betId }, include: { round: true } });
      if (!bet || bet.round.phase !== 'FLYING') return null;
      const crash = Number(bet.round.crashMultiplier.toString());
      if (multiplier < 1 || multiplier >= crash) return null;
      // Low-stake caps: a cash-out above the personal cap is impossible —
      // by the time the rocket passes the cap the bet is already LOST.
      const cap = bet.capMultiplier ? Number(bet.capMultiplier.toString()) : null;
      if (cap != null && multiplier > cap) return null;
      const multiplierMilli = BigInt(Math.floor(multiplier * 1000));
      const claim = await tx.rushBet.updateMany({
        where: { id: betId, status: 'ACTIVE' },
        data: {
          status: 'CASHED_OUT',
          cashoutMultiplier: multiplier.toFixed(2),
          cashedOutAt: new Date(),
          payoutStars: bet.currency === 'STARS' ? payoutStarsFor(bet.stakeStars, multiplierMilli) : 0,
          payoutGram: bet.currency === 'GRAM' ? payoutGramFor(bet.stakeGram.toString(), multiplierMilli) : '0',
        },
      });
      if (claim.count !== 1) return null;
      if (bet.currency === 'STARS') {
        const payout = payoutStarsFor(bet.stakeStars, multiplierMilli);
        await tx.user.update({ where: { id: bet.userId }, data: { balanceStars: { increment: payout } } });
        await tx.gameTransaction.create({
          data: {
            userId: bet.userId,
            game: 'RUSH',
            type: 'PAYOUT',
            reference: `rush:${bet.userId}:${bet.roundId}:cashout`,
            amountGram: starsToGramAmount(payout),
            details: { currency: 'STARS', starAmount: payout, multiplier: multiplier.toFixed(2), round: bet.round.number },
          },
        });
        return { payoutStars: payout, payoutGram: '0' };
      }
      const payout = payoutGramFor(bet.stakeGram.toString(), multiplierMilli);
      await tx.user.update({ where: { id: bet.userId }, data: { balanceGram: { increment: payout } } });
      await tx.gameTransaction.create({
        data: {
          userId: bet.userId,
          game: 'RUSH',
          type: 'PAYOUT',
          reference: `rush:${bet.userId}:${bet.roundId}:cashout`,
          amountGram: payout,
          details: { currency: 'GRAM', multiplier: multiplier.toFixed(2), round: bet.round.number },
        },
      });
      return { payoutStars: 0, payoutGram: payout };
    });
  }
}

@Controller('games/rush')
export class RushController implements OnModuleInit, OnModuleDestroy {
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
    private readonly engine: RushRoundEngine,
  ) {}

  onModuleInit() {
    this.timer = setInterval(() => {
      void this.engine.advance().catch((error) => console.error('RUSH round advance failed:', error));
    }, 1_000);
    void this.engine.advance().catch(() => undefined);
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  @Get('state')
  async state(@Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    await this.engine.advance();
    const now = new Date();
    let round = await this.prisma.rushRound.findFirst({
      orderBy: { number: 'desc' },
      include: {
        bets: {
          include: { user: { select: { id: true, username: true, firstName: true, photoUrl: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!round) {
      // First-ever request: advance() creates the opening round, re-read once.
      await this.engine.advance();
      round = await this.prisma.rushRound.findFirst({
        orderBy: { number: 'desc' },
        include: {
          bets: {
            include: { user: { select: { id: true, username: true, firstName: true, photoUrl: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
      });
    }
    if (!round) throw new BadRequestException('RUSH rounds are warming up, try again in a second');
    const history = await this.prisma.rushRound.findMany({
      where: { phase: 'CRASHED', crashedAt: { not: null } },
      orderBy: { number: 'desc' },
      take: 10,
      select: { number: true, crashMultiplier: true },
    });
    const balances = await this.prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      select: { balanceGram: true, balanceStars: true },
    });

    let currentMultiplier: string | null = null;
    let crashRevealed: string | null = null;
    if (round.phase === 'FLYING' && round.flyingStartedAt) {
      currentMultiplier = floor2(multiplierAt(round.flyingStartedAt, now)).toFixed(2);
    }
    if (round.phase === 'CRASHED') crashRevealed = Number(round.crashMultiplier.toString()).toFixed(2);

    const myBet = round.bets.find((bet) => bet.userId === user.id) ?? null;
    return {
      serverNow: now.toISOString(),
      round: {
        id: round.id,
        number: round.number,
        phase: round.phase,
        bettingEndsAt: round.bettingEndsAt.toISOString(),
        flyingStartedAt: round.flyingStartedAt?.toISOString() ?? null,
        currentMultiplier,
        crashMultiplier: crashRevealed,
      },
      history: history.map((row) => ({ number: row.number, crashMultiplier: Number(row.crashMultiplier.toString()).toFixed(2) })),
      players: round.bets.map((bet) => ({
        isMe: bet.userId === user.id,
        name: bet.user.username ?? bet.user.firstName ?? 'Player',
        photoUrl: bet.user.photoUrl ?? null,
        currency: bet.currency,
        stakeStars: bet.stakeStars,
        stakeGram: bet.stakeGram.toString(),
        autoCashoutAt: bet.autoCashoutAt?.toString() ?? null,
        capMultiplier: bet.capMultiplier?.toString() ?? null,
        status: bet.status,
        cashoutMultiplier: bet.cashoutMultiplier?.toString() ?? null,
        payoutStars: bet.payoutStars,
        payoutGram: bet.payoutGram.toString(),
      })),
      myBet: myBet && {
        id: myBet.id,
        currency: myBet.currency,
        stakeStars: myBet.stakeStars,
        stakeGram: myBet.stakeGram.toString(),
        autoCashoutAt: myBet.autoCashoutAt?.toString() ?? null,
        capMultiplier: myBet.capMultiplier?.toString() ?? null,
        status: myBet.status,
        cashoutMultiplier: myBet.cashoutMultiplier?.toString() ?? null,
        payoutStars: myBet.payoutStars,
        payoutGram: myBet.payoutGram.toString(),
      },
      balanceGram: balances.balanceGram.toString(),
      balanceStars: balances.balanceStars,
    };
  }

  @Post('bet')
  async bet(
    @Body()
    body: {
      initData?: string;
      requestId?: string;
      currency?: string;
      stars?: number;
      gram?: string;
      autoCashoutAt?: number;
    },
  ) {
    const user = await this.getUser(body.initData);
    if (!body.requestId || !/^[a-zA-Z0-9_-]{16,80}$/.test(body.requestId)) {
      throw new BadRequestException('A valid request id is required');
    }
    const currency = body.currency === 'GRAM' ? 'GRAM' : 'STARS';
    const reference = `rush:${user.id}:${body.requestId}`;

    await this.engine.advance();
    const round = await this.prisma.rushRound.findFirst({ orderBy: { number: 'desc' } });
    if (!round || round.phase !== 'BETTING') throw new BadRequestException('Betting is closed for this round');
    if (round.bettingEndsAt.getTime() - Date.now() < 700) throw new BadRequestException('Betting closed — wait for the next round');

    const autoCashoutAt = body.autoCashoutAt == null ? null : Number(body.autoCashoutAt);
    if (autoCashoutAt != null && (!Number.isFinite(autoCashoutAt) || autoCashoutAt < MIN_AUTO || autoCashoutAt > MAX_AUTO)) {
      throw new BadRequestException(`Auto-stop must be between ${MIN_AUTO} and ${MAX_AUTO}`);
    }

    let stakeStars = 0;
    let stakeGram = '0';
    if (currency === 'STARS') {
      stakeStars = Math.floor(Number(body.stars));
      if (!Number.isInteger(stakeStars) || stakeStars < MIN_STARS || stakeStars > MAX_STARS) {
        throw new BadRequestException(`Stake between ${MIN_STARS} and ${MAX_STARS} Stars`);
      }
      stakeGram = starsToGramAmount(stakeStars);
    } else {
      stakeGram = String(body.gram ?? '').trim();
      if (!/^\d+(\.\d{1,9})?$/.test(stakeGram) || toNano(stakeGram) < toNano(MIN_GRAM) || toNano(stakeGram) > toNano(MAX_GRAM)) {
        throw new BadRequestException(`Stake between ${MIN_GRAM} and ${MAX_GRAM} GRAM`);
      }
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        if (currency === 'STARS') {
          const debit = await tx.user.updateMany({
            where: { id: user.id, balanceStars: { gte: stakeStars } },
            data: { balanceStars: { decrement: stakeStars } },
          });
          if (debit.count !== 1) throw new BadRequestException('Insufficient Stars balance for this stake');
        } else {
          const debit = await tx.user.updateMany({
            where: { id: user.id, balanceGram: { gte: stakeGram } },
            data: { balanceGram: { decrement: stakeGram } },
          });
          if (debit.count !== 1) throw new BadRequestException('Insufficient ORBIT balance for this stake');
        }
        // Owner's rule: sub-10-Star stakes fly a capped round 70% of the time.
        const capMultiplier = lowStakeCapFor(stakeStarsEquivalent(currency, stakeStars, stakeGram));
        // A personal cap always beats a higher auto-stop target.
        const effectiveAuto = capMultiplier != null && autoCashoutAt != null && autoCashoutAt > capMultiplier ? capMultiplier : autoCashoutAt;
        await tx.rushBet.create({
          data: {
            roundId: round.id,
            userId: user.id,
            currency,
            stakeStars,
            stakeGram,
            autoCashoutAt: effectiveAuto?.toFixed(2) ?? null,
            capMultiplier: capMultiplier?.toFixed(2) ?? null,
          },
        });
        await tx.gameTransaction.create({
          data: {
            userId: user.id,
            game: 'RUSH',
            type: 'STAKE',
            reference,
            amountGram: `-${stakeGram}`,
            details: { currency, starAmount: stakeStars, round: round.number, autoCashoutAt: effectiveAuto, capMultiplier },
          },
        });
        const balance = await tx.user.findUniqueOrThrow({
          where: { id: user.id },
          select: { balanceGram: true, balanceStars: true },
        });
        return { round: round.number, capMultiplier: capMultiplier?.toFixed(2) ?? null, balanceGram: balance.balanceGram.toString(), balanceStars: balance.balanceStars };
      });
    } catch (error) {
      // A network retry may race the first request; the unique (round, user)
      // pair means only one bet exists — report success for the duplicate.
      const committed = await this.prisma.rushBet.findFirst({ where: { roundId: round.id, userId: user.id } });
      if (committed) {
        const balance = await this.prisma.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true, balanceStars: true } });
        return { round: round.number, capMultiplier: committed.capMultiplier?.toString() ?? null, balanceGram: balance.balanceGram.toString(), balanceStars: balance.balanceStars };
      }
      throw error;
    }
  }

  @Post('cashout')
  async cashout(@Body() body: { initData?: string; betId?: string }) {
    const user = await this.getUser(body.initData);
    if (!body.betId) throw new BadRequestException('betId is required');
    await this.engine.advance();

    const bet = await this.prisma.rushBet.findUnique({ where: { id: body.betId }, include: { round: true } });
    if (!bet || bet.userId !== user.id) throw new BadRequestException('Bet not found');
    if (bet.round.phase !== 'FLYING' || !bet.round.flyingStartedAt) throw new BadRequestException('The rocket already flew');
    const crash = Number(bet.round.crashMultiplier.toString());
    const current = floor2(multiplierAt(bet.round.flyingStartedAt, new Date()));
    if (current >= crash) throw new BadRequestException('The rocket already crashed');

    const settled = await this.engine.settleCashout(bet.id, current);
    if (!settled) throw new BadRequestException('This bet is no longer active');
    const balance = await this.prisma.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true, balanceStars: true } });
    return {
      multiplier: current.toFixed(2),
      payoutStars: settled.payoutStars,
      payoutGram: settled.payoutGram,
      balanceGram: balance.balanceGram.toString(),
      balanceStars: balance.balanceStars,
    };
  }

  private async getUser(initData?: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const profile = this.telegramAuth.validateInitData(initData);
    return this.prisma.user.upsert({
      where: { telegramId: String(profile.id) },
      update: {
        username: profile.username ?? null,
        firstName: profile.first_name ?? null,
        photoUrl: profile.photo_url?.startsWith('https://') ? profile.photo_url : null,
      },
      create: {
        telegramId: String(profile.id),
        username: profile.username ?? null,
        firstName: profile.first_name ?? null,
        lastName: profile.last_name ?? null,
        photoUrl: profile.photo_url?.startsWith('https://') ? profile.photo_url : null,
      },
    });
  }
}
