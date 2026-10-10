import { BadRequestException, Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { randomBytes, randomInt } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';

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
  constructor(private readonly prisma: PrismaService, private readonly telegramAuth: TelegramAuthService) {}

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
