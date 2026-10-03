import {
  BadRequestException,
  Body,
  Controller,
  ConflictException,
  Get,
  Headers,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, randomInt } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';

const roomInclude = {
  participants: {
    include: { user: { select: { id: true, username: true, firstName: true, photoUrl: true } } },
    // Stable ties ensure every player's stake-to-sector geometry is identical.
    orderBy: [{ joinedAt: 'asc' as const }, { id: 'asc' as const }],
  },
  invitations: {
    include: { recipient: { select: { id: true, username: true, firstName: true } } },
    orderBy: { createdAt: 'asc' as const },
  },
  creator: { select: { id: true, username: true, firstName: true } },
  winner: { select: { id: true, username: true, firstName: true, photoUrl: true } },
};

function canonicalStake(value: string) {
  const [whole = '0', fraction = ''] = value.split('.');
  const cleanFraction = fraction.replace(/0+$/, '');
  return `${BigInt(whole).toString()}.${cleanFraction || '0'}`;
}

const NANO = 1_000_000_000n;
// Keep the just-finished public arena reserved until clients can finish the
// winner sequence, including the 1.5s polling delay and a small safety margin.
const PUBLIC_RESULT_HOLD_MS = 15_000;

function toNano(value: string | number | { toString(): string }) {
  const [whole = '0', fraction = ''] = String(value).split('.');
  return BigInt(whole) * NANO + BigInt((fraction + '000000000').slice(0, 9));
}

function fromNano(value: bigint) {
  const whole = value / NANO;
  const fraction = (value % NANO).toString().padStart(9, '0').replace(/0+$/, '');
  return `${whole}.${fraction || '0'}`;
}

function randomBigIntBelow(maxExclusive: bigint) {
  const byteLength = Math.ceil(maxExclusive.toString(2).length / 8);
  const range = 1n << BigInt(byteLength * 8);
  const cutoff = range - (range % maxExclusive);
  let value: bigint;
  do {
    value = BigInt(`0x${randomBytes(byteLength).toString('hex')}`);
  } while (value >= cutoff);
  return value % maxExclusive;
}

function chooseWeightedParticipant<T extends { stakeGram: { toString(): string } }>(participants: T[]) {
  const total = participants.reduce((sum, participant) => sum + toNano(participant.stakeGram), 0n);
  if (total <= 0n) return participants[randomInt(participants.length)];
  let ticket = randomBigIntBelow(total);
  for (const participant of participants) {
    ticket -= toNano(participant.stakeGram);
    if (ticket < 0n) return participant;
  }
  return participants[participants.length - 1];
}

async function charge(tx: Prisma.TransactionClient, userId: string, amount: string, reference: string, details?: Prisma.InputJsonValue) {
  const debit = await tx.user.updateMany({ where: { id: userId, balanceGram: { gte: amount } }, data: { balanceGram: { decrement: amount } } });
  if (debit.count !== 1) throw new BadRequestException('Insufficient ORBIT balance for this stake');
  await tx.gameTransaction.create({ data: { userId, game: 'PVP', type: 'STAKE', reference, amountGram: `-${amount}`, details } });
}

async function settleWinner(tx: Prisma.TransactionClient, roomId: string, winnerId: string, pot: string) {
  const changed = await tx.pvpRoom.updateMany({ where: { id: roomId, settledAt: null }, data: { settledAt: new Date() } });
  if (changed.count !== 1) return;
  await tx.user.update({ where: { id: winnerId }, data: { balanceGram: { increment: pot } } });
  await tx.gameTransaction.create({ data: { userId: winnerId, game: 'PVP', type: 'PAYOUT', reference: `pvp:${roomId}:payout`, amountGram: pot, details: { roomId, winnerId } } });
}

async function refundRoom(tx: Prisma.TransactionClient, roomId: string, participants: Array<{ userId: string; stakeGram: { toString(): string } }>) {
  const changed = await tx.pvpRoom.updateMany({ where: { id: roomId, settledAt: null, status: { in: ['WAITING', 'COUNTDOWN'] } }, data: { status: 'CANCELLED', settledAt: new Date() } });
  if (changed.count !== 1) return;
  for (const participant of participants) {
    const amount = participant.stakeGram.toString();
    if (toNano(amount) <= 0n) continue;
    await tx.user.update({ where: { id: participant.userId }, data: { balanceGram: { increment: amount } } });
    await tx.gameTransaction.create({ data: { userId: participant.userId, game: 'PVP', type: 'REFUND', reference: `pvp:${roomId}:refund:${participant.userId}`, amountGram: amount, details: { roomId } } });
  }
}

@Controller('pvp')
export class PvpController implements OnModuleInit, OnModuleDestroy {
  private expiryTimer?: NodeJS.Timeout;
  private expirySweepRunning = false;
  private botUsername?: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
  ) {}

  onModuleInit() {
    this.expiryTimer = setInterval(() => {
      void this.finishExpiredPublicRooms().catch((error: unknown) => console.error('Arena countdown sweep failed:', error));
    }, 1000);
    this.expiryTimer.unref();
  }

  onModuleDestroy() {
    if (this.expiryTimer) clearInterval(this.expiryTimer);
  }

  @Get('users/search')
  async searchUsers(@Query('q') query: string, @Headers('x-telegram-init-data') initData: string) {
    const current = await this.getUser(initData);
    const q = (query ?? '').replace(/^@/, '').trim();
    if (q.length < 2) return [];
    return this.prisma.user.findMany({
      where: {
        id: { not: current.id },
        username: { contains: q, mode: 'insensitive' },
      },
      select: { id: true, username: true, firstName: true, photoUrl: true },
      orderBy: { username: 'asc' },
      take: 20,
    });
  }

  @Get('public-rooms')
  async publicRooms(@Query('mode') requestedMode: string, @Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    await this.finishExpiredPublicRooms();
    const arenaMode = requestedMode === 'WHEEL' ? 'WHEEL' : 'CLASSIC';
    const recentCutoff = new Date(Date.now() - 30_000);
    const [activeAndRecentRooms, lastCompletedRoom] = await Promise.all([
      this.prisma.pvpRoom.findMany({
        where: {
          isPublic: true,
          arenaMode,
          OR: [
            { status: { in: ['WAITING', 'COUNTDOWN'] } },
            { status: 'COMPLETED', completedAt: { gte: recentCutoff } },
          ],
        },
        include: roomInclude,
        orderBy: { createdAt: 'desc' },
        take: 30,
      }),
      this.prisma.pvpRoom.findFirst({
        where: { isPublic: true, arenaMode, status: 'COMPLETED', winnerId: { not: null } },
        include: roomInclude,
        orderBy: [{ completedAt: 'desc' }, { createdAt: 'desc' }],
      }),
    ]);
    const rooms = lastCompletedRoom && !activeAndRecentRooms.some(({ id }) => id === lastCompletedRoom.id)
      ? [...activeAndRecentRooms, lastCompletedRoom]
      : activeAndRecentRooms;
    return rooms.map((room) => {
      const viewerEntry = room.participants.find(({ userId }) => userId === user.id);
      return {
        ...room,
        viewerIsCreator: room.creatorId === user.id,
        viewerIsParticipant: Boolean(viewerEntry),
        viewerStakeGram: viewerEntry?.stakeGram ?? null,
      };
    });
  }

  @Get('share-link')
  async shareLink(@Query('code') code: string, @Headers('x-telegram-init-data') initData: string) {
    await this.getUser(initData);
    if (!code) throw new BadRequestException('Room code is required');
    const room = await this.prisma.pvpRoom.findUnique({ where: { code }, select: { code: true } });
    if (!room) throw new NotFoundException('Arena room not found');
    return { url: await this.arenaDeepLink(room.code) };
  }

  @Post('public-join')
  async joinPublicArena(@Body() body: { initData?: string; stakeGram?: string; arenaMode?: string }) {
    const user = await this.getUser(body.initData);
    const arenaMode = body.arenaMode === 'WHEEL' ? 'WHEEL' : 'CLASSIC';
    const input = body.stakeGram ?? '';
    if (!/^\d{1,8}(\.\d{1,9})?$/.test(input) || Number(input) <= 0 || Number(input) > 100000) {
      throw new BadRequestException('Enter a stake from 0.000000001 to 100,000 GRAM');
    }
    const stake = canonicalStake(input);
    const roomResult = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext('orbit-public-arena'))::text AS locked`;
      const now = new Date();

      // Expire the previous countdown while holding the same cross-instance
      // lock used to join/create the public room. Otherwise a request arriving
      // at the countdown boundary can see no eligible room and create a second
      // one before the background sweep commits the first result.
      const expiredRooms = await tx.pvpRoom.findMany({
        where: {
          OR: [
            { isPublic: true, status: 'COUNTDOWN', OR: [{ countdownEndsAt: null }, { countdownEndsAt: { lte: now } }] },
            { status: 'WAITING', createdAt: { lte: new Date(now.getTime() - 15 * 60_000) } },
          ],
        },
        include: { participants: { select: { userId: true, stakeGram: true } } },
        take: 50,
      });
      for (const expiredRoom of expiredRooms) {
        if (expiredRoom.status === 'WAITING') {
          await refundRoom(tx, expiredRoom.id, expiredRoom.participants);
          continue;
        }
        if (expiredRoom.participants.length < 2) {
          await refundRoom(tx, expiredRoom.id, expiredRoom.participants);
          continue;
        }
        const winner = chooseWeightedParticipant(expiredRoom.participants);
        const settled = await tx.pvpRoom.updateMany({
          where: { id: expiredRoom.id, isPublic: true, status: 'COUNTDOWN', OR: [{ countdownEndsAt: null }, { countdownEndsAt: { lte: now } }] },
          data: { status: 'COMPLETED', winnerId: winner.userId, completedAt: now },
        });
        if (settled.count === 1) await settleWinner(tx, expiredRoom.id, winner.userId, expiredRoom.stakeGram.toString());
      }

      const finishingRoom = await tx.pvpRoom.findFirst({
        where: {
          isPublic: true,
          arenaMode,
          status: 'COMPLETED',
          completedAt: { gte: new Date(now.getTime() - PUBLIC_RESULT_HOLD_MS) },
        },
        orderBy: [{ completedAt: 'desc' }, { createdAt: 'desc' }],
        select: { id: true },
      });
      if (finishingRoom) return { roomId: finishingRoom.id, isFinishing: true };

      const room = await tx.pvpRoom.findFirst({
        where: {
          isPublic: true,
          arenaMode,
          OR: [
            { status: 'WAITING' },
            { status: 'COUNTDOWN', countdownEndsAt: { gt: now } },
          ],
        },
        include: { participants: { select: { userId: true, stakeGram: true } } },
        orderBy: { createdAt: 'desc' },
      });

      if (!room) {
        const created = await tx.pvpRoom.create({
          data: {
            code: randomBytes(5).toString('base64url').toUpperCase(),
            stakeGram: stake,
            creatorId: user.id,
            isPublic: true,
            arenaMode,
            participants: { create: { userId: user.id, stakeGram: stake } },
          },
        });
        await charge(tx, user.id, stake, `pvp:${created.id}:stake:${user.id}:${randomBytes(6).toString('hex')}`, { roomId: created.id });
        return { roomId: created.id, isFinishing: false };
      }

      const existingEntry = room.participants.find(({ userId }) => userId === user.id);
      if (existingEntry) {
        if (room.status === 'WAITING') {
          const total = toNano(room.stakeGram) - toNano(existingEntry.stakeGram) + toNano(stake);
          const delta = toNano(stake) - toNano(existingEntry.stakeGram);
          if (delta > 0n) await charge(tx, user.id, fromNano(delta), `pvp:${room.id}:stake:${user.id}:${randomBytes(6).toString('hex')}`, { roomId: room.id });
          else if (delta < 0n) {
            const refund = fromNano(-delta);
            await tx.user.update({ where: { id: user.id }, data: { balanceGram: { increment: refund } } });
            await tx.gameTransaction.create({ data: { userId: user.id, game: 'PVP', type: 'REFUND', reference: `pvp:${room.id}:refund:${randomBytes(8).toString('hex')}`, amountGram: refund, details: { roomId: room.id } } });
          }
          await tx.pvpParticipant.update({ where: { roomId_userId: { roomId: room.id, userId: user.id } }, data: { stakeGram: stake } });
          await tx.pvpRoom.update({ where: { id: room.id }, data: { stakeGram: fromNano(total) } });
        } else if (room.status === 'COUNTDOWN') {
          const addedStake = toNano(existingEntry.stakeGram) + toNano(stake);
          const total = toNano(room.stakeGram) + toNano(stake);
          await charge(tx, user.id, stake, `pvp:${room.id}:stake:${user.id}:${randomBytes(6).toString('hex')}`, { roomId: room.id });
          await tx.pvpParticipant.update({ where: { roomId_userId: { roomId: room.id, userId: user.id } }, data: { stakeGram: fromNano(addedStake) } });
          await tx.pvpRoom.update({ where: { id: room.id }, data: { stakeGram: fromNano(total) } });
        }
        return { roomId: room.id, isFinishing: false };
      }
      await charge(tx, user.id, stake, `pvp:${room.id}:stake:${user.id}:${randomBytes(6).toString('hex')}`, { roomId: room.id });
      await tx.pvpParticipant.create({ data: { roomId: room.id, userId: user.id, stakeGram: stake } });
      const total = toNano(room.stakeGram) + toNano(stake);
      if (room.status === 'WAITING' && room.participants.length >= 1) {
        const startedAt = new Date();
        await tx.pvpRoom.update({
          where: { id: room.id },
          data: {
            stakeGram: fromNano(total),
            status: 'COUNTDOWN',
            startedAt,
            countdownEndsAt: new Date(startedAt.getTime() + 10_000),
          },
        });
      } else {
        await tx.pvpRoom.update({ where: { id: room.id }, data: { stakeGram: fromNano(total) } });
      }
      return { roomId: room.id, isFinishing: false };
    });

    if (roomResult.isFinishing) {
      throw new ConflictException('The previous arena is finishing. Wait a moment for the next round.');
    }
    return this.getRoomForViewer(roomResult.roomId, user.id);
  }

  @Post('rooms')
  async createRoom(@Body() body: { initData?: string; stakeGram?: string; inviteeIds?: string[]; arenaMode?: string }) {
    const creator = await this.getUser(body.initData);
    const arenaMode = body.arenaMode === 'WHEEL' ? 'WHEEL' : 'CLASSIC';
    const stake = body.stakeGram ?? '';
    if (!/^\d{1,8}(\.\d{1,9})?$/.test(stake) || Number(stake) <= 0) {
      throw new BadRequestException('Enter a stake greater than zero (up to 9 decimals)');
    }
    if (Number(stake) > 100000) throw new BadRequestException('Stake cannot exceed 100,000 GRAM');

    const inviteeIds = [...new Set((body.inviteeIds ?? []).filter((id) => id !== creator.id))];
    const invitees = inviteeIds.length
      ? await this.prisma.user.findMany({ where: { id: { in: inviteeIds } }, select: { id: true, telegramId: true } })
      : [];
    // Private-room codes are unguessable bearer links; do not expose short sequential-looking codes.
    const code = randomBytes(16).toString('base64url');

    const room = await this.prisma.$transaction(async (tx) => {
      const created = await tx.pvpRoom.create({
        data: {
          code,
          stakeGram: stake,
          creatorId: creator.id,
          arenaMode,
          participants: { create: { userId: creator.id, stakeGram: stake } },
          invitations: invitees.length ? {
            create: invitees.map(({ id }) => ({ senderId: creator.id, recipientId: id })),
          } : undefined,
        },
      });
      await charge(tx, creator.id, stake, `pvp:${created.id}:stake:${creator.id}:${randomBytes(6).toString('hex')}`, { roomId: created.id });
      return tx.pvpRoom.findUniqueOrThrow({ where: { id: created.id }, include: roomInclude });
    });
    const notificationStats = await this.notifyInvitees(invitees.map(({ telegramId }) => telegramId), code, stake)
      .catch((error: unknown) => {
        console.error('Arena invite delivery failed:', error);
        return { sent: 0, failed: invitees.length };
      });
    return { ...room, notificationStats, viewerIsCreator: true, viewerIsParticipant: true };
  }

  @Get('rooms/mine')
  async myRooms(@Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    const participations = await this.prisma.pvpParticipant.findMany({
      where: { userId: user.id },
      orderBy: { joinedAt: 'desc' },
      take: 12,
      select: { roomId: true },
    });
    const rooms = await this.prisma.pvpRoom.findMany({
      where: { id: { in: participations.map(({ roomId }) => roomId) } },
      include: roomInclude,
      orderBy: { createdAt: 'desc' },
    });
    return rooms.map((room) => ({ ...room, viewerIsCreator: room.creatorId === user.id, viewerIsParticipant: true }));
  }

  @Get('rooms')
  async getRoom(@Query('code') code: string, @Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    const room = await this.prisma.pvpRoom.findUnique({ where: { code }, include: roomInclude });
    if (!room) throw new NotFoundException('Arena room not found');
    return {
      ...room,
      viewerIsCreator: room.creatorId === user.id,
      viewerIsParticipant: room.participants.some(({ userId }) => userId === user.id),
      viewerStakeGram: room.participants.find(({ userId }) => userId === user.id)?.stakeGram ?? null,
    };
  }

  @Post('rooms/join')
  async joinRoom(@Body() body: { initData?: string; code?: string }) {
    const user = await this.getUser(body.initData);
    if (!body.code) throw new BadRequestException('Room code is required');
    const joinedRoom = await this.prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "PvpRoom" WHERE "code" = ${body.code} FOR UPDATE`;
      if (!locked[0]) throw new NotFoundException('Arena room not found');
      const room = await tx.pvpRoom.findUniqueOrThrow({ where: { id: locked[0].id } });
      if (room.isPublic) throw new BadRequestException('Join the open arena from the public room entrance');
      if (room.status !== 'WAITING') throw new BadRequestException('This arena round has already started');
      const existing = await tx.pvpParticipant.findUnique({ where: { roomId_userId: { roomId: room.id, userId: user.id } } });
      if (!existing) {
        await charge(tx, user.id, room.stakeGram.toString(), `pvp:${room.id}:stake:${user.id}:${randomBytes(6).toString('hex')}`, { roomId: room.id });
        await tx.pvpRoom.update({ where: { id: room.id }, data: { stakeGram: fromNano(toNano(room.stakeGram) + toNano(room.stakeGram)) } });
      }
      await tx.pvpParticipant.upsert({
        where: { roomId_userId: { roomId: room.id, userId: user.id } },
        update: {},
        create: { roomId: room.id, userId: user.id, stakeGram: room.stakeGram },
      });
      await tx.pvpInvitation.updateMany({
        where: { roomId: room.id, recipientId: user.id, status: 'PENDING' },
        data: { status: 'ACCEPTED' },
      });
      return tx.pvpRoom.findUniqueOrThrow({ where: { id: room.id }, include: roomInclude });
    });
    return { ...joinedRoom, viewerIsCreator: joinedRoom.creatorId === user.id, viewerIsParticipant: true };
  }

  @Get('invitations')
  async invitations(@Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    return this.prisma.pvpInvitation.findMany({
      where: { recipientId: user.id, status: 'PENDING', room: { status: 'WAITING' } },
      include: {
        sender: { select: { username: true, firstName: true } },
        room: { select: { code: true, stakeGram: true, createdAt: true, _count: { select: { participants: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('invitations/answer')
  async answerInvitation(@Body() body: { initData?: string; invitationId?: string; accept?: boolean }) {
    const user = await this.getUser(body.initData);
    if (!body.invitationId) throw new BadRequestException('Invitation id is required');
    const invitation = await this.prisma.pvpInvitation.findFirst({
      where: { id: body.invitationId, recipientId: user.id },
      select: { id: true, roomId: true },
    });
    if (!invitation) throw new NotFoundException('Invitation is no longer available');

    const answeredRoom = await this.prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "PvpRoom" WHERE "id" = ${invitation.roomId} FOR UPDATE`;
      if (!locked[0]) throw new NotFoundException('Arena room not found');
      const room = await tx.pvpRoom.findUniqueOrThrow({ where: { id: invitation.roomId } });
      if (room.isPublic || room.status !== 'WAITING') throw new BadRequestException('This round has already started');
      const pendingInvitation = await tx.pvpInvitation.findFirst({
        where: { id: invitation.id, recipientId: user.id, status: 'PENDING' },
      });
      if (!pendingInvitation) throw new BadRequestException('Invitation has already been answered');
      const changed = await tx.pvpInvitation.updateMany({
        where: { id: invitation.id, recipientId: user.id, status: 'PENDING' },
        data: { status: body.accept ? 'ACCEPTED' : 'DECLINED' },
      });
      if (changed.count !== 1) throw new BadRequestException('Invitation has already been answered');
      if (body.accept) {
        const existing = await tx.pvpParticipant.findUnique({ where: { roomId_userId: { roomId: invitation.roomId, userId: user.id } } });
        if (!existing) {
          await charge(tx, user.id, room.stakeGram.toString(), `pvp:${room.id}:stake:${user.id}:${randomBytes(6).toString('hex')}`, { roomId: room.id });
          await tx.pvpRoom.update({ where: { id: room.id }, data: { stakeGram: fromNano(toNano(room.stakeGram) + toNano(room.stakeGram)) } });
        }
        await tx.pvpParticipant.upsert({
          where: { roomId_userId: { roomId: invitation.roomId, userId: user.id } },
          update: {},
          create: { roomId: invitation.roomId, userId: user.id, stakeGram: room.stakeGram },
        });
      }
      return tx.pvpRoom.findUniqueOrThrow({ where: { id: invitation.roomId }, include: roomInclude });
    });
    return {
      ...answeredRoom,
      viewerIsCreator: answeredRoom.creatorId === user.id,
      viewerIsParticipant: answeredRoom.participants.some(({ userId }) => userId === user.id),
    };
  }

  @Post('rooms/start')
  async startRound(@Body() body: { initData?: string; code?: string }) {
    const user = await this.getUser(body.initData);
    if (!body.code) throw new BadRequestException('Room code is required');
    const completedRoom = await this.prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "PvpRoom" WHERE "code" = ${body.code} FOR UPDATE`;
      if (!locked[0]) throw new NotFoundException('Arena room not found');
      const room = await tx.pvpRoom.findUniqueOrThrow({
        where: { id: locked[0].id },
        include: { participants: { select: { userId: true } } },
      });
      if (room.creatorId !== user.id) throw new UnauthorizedException('Only the room creator can start this round');
      if (room.isPublic || room.status !== 'WAITING') throw new BadRequestException('This arena round has already started');
      if (room.participants.length < 2) throw new BadRequestException('Invite or join at least one more player first');

      const winner = room.participants[randomInt(room.participants.length)];
      const completedAt = new Date();
      const started = await tx.pvpRoom.updateMany({
        where: { id: room.id, status: 'WAITING' },
        data: { status: 'COMPLETED', startedAt: completedAt, completedAt, winnerId: winner.userId },
      });
      if (started.count !== 1) throw new BadRequestException('This round has already started');
      await settleWinner(tx, room.id, winner.userId, room.stakeGram.toString());
      return tx.pvpRoom.findUniqueOrThrow({ where: { id: room.id }, include: roomInclude });
    });
    return { ...completedRoom, viewerIsCreator: completedRoom.creatorId === user.id, viewerIsParticipant: true };
  }

  private async getUser(initData?: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const telegramUser = this.telegramAuth.validateInitData(initData);
    const telegramId = String(telegramUser.id);
    const existing = await this.prisma.user.findUnique({ where: { telegramId } });
    if (existing) return existing;
    return this.prisma.user.upsert({
      where: { telegramId },
      update: {},
      create: {
        telegramId,
        username: telegramUser.username ?? null,
        firstName: telegramUser.first_name ?? null,
        lastName: telegramUser.last_name ?? null,
        photoUrl: telegramUser.photo_url?.startsWith('https://') ? telegramUser.photo_url : null,
      },
    });
  }

  private async getRoomForViewer(roomId: string, userId: string) {
    const room = await this.prisma.pvpRoom.findUniqueOrThrow({ where: { id: roomId }, include: roomInclude });
    return {
      ...room,
      viewerIsCreator: room.creatorId === userId,
      viewerIsParticipant: room.participants.some(({ userId: participantId }) => participantId === userId),
      viewerStakeGram: room.participants.find(({ userId: participantId }) => participantId === userId)?.stakeGram ?? null,
    };
  }

  private async finishExpiredPublicRooms() {
    if (this.expirySweepRunning) return;
    this.expirySweepRunning = true;
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext('orbit-public-arena'))::text AS locked`;
        const now = new Date();
        const expired = await tx.pvpRoom.findMany({
          where: {
            OR: [
              { isPublic: true, status: 'COUNTDOWN', OR: [{ countdownEndsAt: null }, { countdownEndsAt: { lte: now } }] },
              { status: 'WAITING', createdAt: { lte: new Date(now.getTime() - 15 * 60_000) } },
            ],
          },
          include: { participants: { select: { userId: true, stakeGram: true } } },
          take: 50,
        });
        for (const room of expired) {
          if (room.status === 'WAITING') {
            await refundRoom(tx, room.id, room.participants);
            continue;
          }
          if (room.participants.length < 2) {
            await refundRoom(tx, room.id, room.participants);
            continue;
          }
          const winner = chooseWeightedParticipant(room.participants);
          const settled = await tx.pvpRoom.updateMany({
            where: { id: room.id, isPublic: true, status: 'COUNTDOWN', OR: [{ countdownEndsAt: null }, { countdownEndsAt: { lte: now } }] },
            data: { status: 'COMPLETED', winnerId: winner.userId, completedAt: now },
          });
          if (settled.count === 1) await settleWinner(tx, room.id, winner.userId, room.stakeGram.toString());
        }
      });
    } finally {
      this.expirySweepRunning = false;
    }
  }

  private async notifyInvitees(telegramIds: string[], code: string, stakeGram: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || telegramIds.length === 0) return { sent: 0, failed: telegramIds.length };

    const url = await this.arenaDeepLink(code);
    const results = await Promise.allSettled(telegramIds.map(async (chatId) => {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `You have an ORBIT Arena invitation. Stake: ${stakeGram} GRAM per player, charged from your ORBIT balance only if you accept. Unstarted rooms are refunded after 15 minutes.`,
          reply_markup: {
            inline_keyboard: [[{ text: 'Open ORBIT Arena', url }]],
          },
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) return false;
      const result = await response.json() as { ok?: boolean };
      return result.ok === true;
    }));
    const sent = results.filter((result) => result.status === 'fulfilled' && result.value).length;
    return { sent, failed: telegramIds.length - sent };
  }

  private async arenaDeepLink(code: string) {
    const username = await this.telegramBotUsername();
    const startParam = `arena_${code}`;
    return `https://t.me/${username}?startapp=${encodeURIComponent(startParam)}`;
  }

  private async telegramBotUsername() {
    if (this.botUsername) return this.botUsername;
    const configuredUsername = process.env.TELEGRAM_BOT_USERNAME?.replace(/^@/, '').trim();
    if (configuredUsername) {
      this.botUsername = configuredUsername;
      return configuredUsername;
    }
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      this.botUsername = 'gifty_mrkt_bot';
      return this.botUsername;
    }
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`, { signal: AbortSignal.timeout(5000) });
    const result = await response.json() as { ok?: boolean; result?: { username?: string } };
    if (!response.ok || !result.ok || !result.result?.username) {
      throw new BadRequestException('Could not resolve the Telegram bot username');
    }
    this.botUsername = result.result.username;
    return this.botUsername;
  }
}
