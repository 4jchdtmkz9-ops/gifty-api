import {
  BadRequestException,
  Body,
  Controller,
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
import { TelegramAuthService } from '../auth/telegram-auth.service.js';

const roomInclude = {
  participants: {
    include: { user: { select: { id: true, username: true, firstName: true, photoUrl: true } } },
    orderBy: { joinedAt: 'asc' as const },
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

@Controller('pvp')
export class PvpController implements OnModuleInit, OnModuleDestroy {
  private expiryTimer?: NodeJS.Timeout;
  private expirySweepRunning = false;

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
  async publicRooms(@Headers('x-telegram-init-data') initData: string) {
    const user = await this.getUser(initData);
    await this.finishExpiredPublicRooms();
    const recentCutoff = new Date(Date.now() - 30_000);
    const rooms = await this.prisma.pvpRoom.findMany({
      where: {
        isPublic: true,
        OR: [
          { status: { in: ['WAITING', 'COUNTDOWN'] } },
          { status: 'COMPLETED', completedAt: { gte: recentCutoff } },
        ],
      },
      include: roomInclude,
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
    return rooms.map((room) => ({
      ...room,
      viewerIsCreator: room.creatorId === user.id,
      viewerIsParticipant: room.participants.some(({ userId }) => userId === user.id),
    }));
  }

  @Post('public-join')
  async joinPublicArena(@Body() body: { initData?: string; stakeGram?: string }) {
    const user = await this.getUser(body.initData);
    const input = body.stakeGram ?? '';
    if (!/^\d{1,8}(\.\d{1,9})?$/.test(input) || Number(input) <= 0 || Number(input) > 100000) {
      throw new BadRequestException('Enter a demo stake from 0.000000001 to 100,000 GRAM');
    }
    const stake = canonicalStake(input);
    await this.finishExpiredPublicRooms();
    const roomId = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${stake}))`;
      const now = new Date();
      const room = await tx.pvpRoom.findFirst({
        where: {
          isPublic: true,
          stakeGram: stake,
          OR: [
            { status: 'WAITING' },
            { status: 'COUNTDOWN', countdownEndsAt: { gt: now } },
          ],
        },
        include: { participants: { select: { userId: true } } },
        orderBy: { createdAt: 'asc' },
      });

      if (!room) {
        const created = await tx.pvpRoom.create({
          data: {
            code: randomBytes(5).toString('base64url').toUpperCase(),
            stakeGram: stake,
            creatorId: user.id,
            isPublic: true,
            participants: { create: { userId: user.id } },
          },
        });
        return created.id;
      }

      if (room.participants.some(({ userId }) => userId === user.id)) return room.id;
      await tx.pvpParticipant.create({ data: { roomId: room.id, userId: user.id } });
      if (room.status === 'WAITING' && room.participants.length >= 1) {
        const startedAt = new Date();
        await tx.pvpRoom.update({
          where: { id: room.id },
          data: {
            status: 'COUNTDOWN',
            startedAt,
            countdownEndsAt: new Date(startedAt.getTime() + 15_000),
          },
        });
      }
      return room.id;
    });

    return this.getRoomForViewer(roomId, user.id);
  }

  @Post('rooms')
  async createRoom(@Body() body: { initData?: string; stakeGram?: string; inviteeIds?: string[] }) {
    const creator = await this.getUser(body.initData);
    const stake = body.stakeGram ?? '';
    if (!/^\d{1,8}(\.\d{1,9})?$/.test(stake) || Number(stake) <= 0) {
      throw new BadRequestException('Enter a demo stake greater than zero (up to 9 decimals)');
    }
    if (Number(stake) > 100000) throw new BadRequestException('Demo stake cannot exceed 100,000 GRAM');

    const inviteeIds = [...new Set((body.inviteeIds ?? []).filter((id) => id !== creator.id))];
    const invitees = inviteeIds.length
      ? await this.prisma.user.findMany({ where: { id: { in: inviteeIds } }, select: { id: true, telegramId: true } })
      : [];
    const code = randomBytes(5).toString('base64url').toUpperCase();

    const room = await this.prisma.$transaction(async (tx) => {
      const created = await tx.pvpRoom.create({
        data: {
          code,
          stakeGram: stake,
          creatorId: creator.id,
          participants: { create: { userId: creator.id } },
          invitations: invitees.length ? {
            create: invitees.map(({ id }) => ({ senderId: creator.id, recipientId: id })),
          } : undefined,
        },
      });
      return tx.pvpRoom.findUniqueOrThrow({ where: { id: created.id }, include: roomInclude });
    });
    const notificationStats = await this.notifyInvitees(invitees.map(({ telegramId }) => telegramId), code, stake);
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
    };
  }

  @Post('rooms/join')
  async joinRoom(@Body() body: { initData?: string; code?: string }) {
    const user = await this.getUser(body.initData);
    if (!body.code) throw new BadRequestException('Room code is required');
    const room = await this.prisma.pvpRoom.findUnique({ where: { code: body.code } });
    if (!room) throw new NotFoundException('Arena room not found');
    if (room.status !== 'WAITING') throw new BadRequestException('This arena round has already started');
    await this.prisma.$transaction(async (tx) => {
      await tx.pvpParticipant.upsert({
        where: { roomId_userId: { roomId: room.id, userId: user.id } },
        update: {},
        create: { roomId: room.id, userId: user.id },
      });
      await tx.pvpInvitation.updateMany({
        where: { roomId: room.id, recipientId: user.id, status: 'PENDING' },
        data: { status: 'ACCEPTED' },
      });
    });
    const joinedRoom = await this.prisma.pvpRoom.findUniqueOrThrow({ where: { id: room.id }, include: roomInclude });
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
      where: { id: body.invitationId, recipientId: user.id, status: 'PENDING' },
      include: { room: true },
    });
    if (!invitation) throw new NotFoundException('Invitation is no longer available');
    if (invitation.room.status !== 'WAITING') throw new BadRequestException('This round has already started');

    await this.prisma.$transaction(async (tx) => {
      const changed = await tx.pvpInvitation.updateMany({
        where: { id: invitation.id, recipientId: user.id, status: 'PENDING' },
        data: { status: body.accept ? 'ACCEPTED' : 'DECLINED' },
      });
      if (changed.count !== 1) throw new BadRequestException('Invitation has already been answered');
      if (body.accept) {
        await tx.pvpParticipant.upsert({
          where: { roomId_userId: { roomId: invitation.roomId, userId: user.id } },
          update: {},
          create: { roomId: invitation.roomId, userId: user.id },
        });
      }
    });
    const answeredRoom = await this.prisma.pvpRoom.findUniqueOrThrow({ where: { id: invitation.roomId }, include: roomInclude });
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
    const room = await this.prisma.pvpRoom.findUnique({
      where: { code: body.code },
      include: { participants: { select: { userId: true } } },
    });
    if (!room) throw new NotFoundException('Arena room not found');
    if (room.creatorId !== user.id) throw new UnauthorizedException('Only the room creator can start this demo round');
    if (room.status !== 'WAITING') throw new BadRequestException('This round has already started');
    if (room.participants.length < 2) throw new BadRequestException('Invite or join at least one more player first');

    const winner = room.participants[randomInt(room.participants.length)];
    const started = await this.prisma.pvpRoom.updateMany({
      where: { id: room.id, status: 'WAITING' },
      data: { status: 'COMPLETED', startedAt: new Date(), completedAt: new Date(), winnerId: winner.userId },
    });
    if (started.count !== 1) throw new BadRequestException('This round has already started');
    const completedRoom = await this.prisma.pvpRoom.findUniqueOrThrow({ where: { id: room.id }, include: roomInclude });
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
    };
  }

  private async finishExpiredPublicRooms() {
    if (this.expirySweepRunning) return;
    this.expirySweepRunning = true;
    try {
      const now = new Date();
      const expired = await this.prisma.pvpRoom.findMany({
        where: { isPublic: true, status: 'COUNTDOWN', countdownEndsAt: { lte: now } },
        include: { participants: { select: { userId: true } } },
        take: 50,
      });
      for (const room of expired) {
        if (room.participants.length < 2) {
          await this.prisma.pvpRoom.updateMany({
            where: { id: room.id, status: 'COUNTDOWN', countdownEndsAt: { lte: now } },
            data: { status: 'WAITING', startedAt: null, countdownEndsAt: null },
          });
          continue;
        }
        const winner = room.participants[randomInt(room.participants.length)];
        await this.prisma.pvpRoom.updateMany({
          where: { id: room.id, isPublic: true, status: 'COUNTDOWN', countdownEndsAt: { lte: now } },
          data: { status: 'COMPLETED', winnerId: winner.userId, completedAt: now },
        });
      }
    } finally {
      this.expirySweepRunning = false;
    }
  }

  private async notifyInvitees(telegramIds: string[], code: string, stakeGram: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || telegramIds.length === 0) return { sent: 0, failed: telegramIds.length };

    const appUrl = (process.env.ORBIT_WEB_APP_URL || 'https://gifty-web-iota.vercel.app').replace(/\/+$/, '');
    const url = `${appUrl}/arena?room=${encodeURIComponent(code)}`;
    const results = await Promise.allSettled(telegramIds.map(async (chatId) => {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `You have an ORBIT Arena invitation. Demo stake: ${stakeGram} GRAM per player. No funds will be charged.`,
          reply_markup: {
            inline_keyboard: [[{ text: 'Open ORBIT Arena', web_app: { url } }]],
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
}
