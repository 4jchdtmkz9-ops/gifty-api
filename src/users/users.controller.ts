import {
  Body,
  Controller,
  ConflictException,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
  ) {}

  @Get('test')
  async testUser() {
    const user = await this.prisma.user.upsert({
      where: {
        telegramId: 'test-telegram-user',
      },
      update: {},
      create: {
        telegramId: 'test-telegram-user',
        username: 'orbit_test',
      },
    });

    return user;
  }

  @Get('telegram-config')
  telegramConfig() {
    return {
      configured: this.telegramAuth.isConfigured(),
    };
  }

  @Post('telegram-auth')
  async telegramAuthUser(@Body() body: { initData?: string }) {
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(body.initData);

    return this.upsertTelegramUser(telegramUser);
  }

  @Post('me')
  async getCurrentUser(@Body() body: { initData?: string; address?: string; network?: string }) {
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(body.initData);
    const user = await this.upsertTelegramUser(telegramUser);

    if (body.address) {
      await this.saveWallet(user.id, body.address, body.network ?? 'TON');
    }

    return this.prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      include: {
        wallets: {
          where: { isConnected: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  @Post('wallet')
  async connectWallet(
    @Body()
    body: {
      initData?: string;
      address?: string;
      network?: string;
    },
  ) {
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    if (!body.address) {
      throw new UnauthorizedException('Wallet address is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(body.initData);

    const user = await this.upsertTelegramUser(telegramUser);

    return this.saveWallet(user.id, body.address, body.network ?? 'TON');
  }

  private saveWallet(userId: string, address: string, network: string) {
    return this.prisma.$transaction(async (tx) => {
      const existingWallet = await tx.wallet.findUnique({
        where: { address },
      });

      if (existingWallet && existingWallet.userId !== userId) {
        throw new ConflictException('Wallet is already linked to another user');
      }

      await tx.wallet.updateMany({
        where: { userId, isConnected: true },
        data: { isConnected: false },
      });

      return tx.wallet.upsert({
        where: { address },
        update: {
          network,
          isConnected: true,
        },
        create: {
          address,
          network,
          userId,
          isConnected: true,
        },
      });
    });
  }

  @Post('wallet/disconnect')
  async disconnectWallet(@Body() body: { initData?: string }) {
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(body.initData);
    const user = await this.upsertTelegramUser(telegramUser);

    const result = await this.prisma.wallet.updateMany({
      where: { userId: user.id, isConnected: true },
      data: { isConnected: false },
    });

    return { disconnected: result.count > 0 };
  }

  private upsertTelegramUser(telegramUser: {
    id: number | string;
    username?: string;
    first_name?: string;
    last_name?: string;
    photo_url?: string;
  }) {
    const profile = {
      username: telegramUser.username ?? null,
      firstName: telegramUser.first_name ?? null,
      lastName: telegramUser.last_name ?? null,
      photoUrl: telegramUser.photo_url?.startsWith('https://')
        ? telegramUser.photo_url
        : null,
    };

    return this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: profile,
      create: {
        telegramId: String(telegramUser.id),
        ...profile,
      },
    });
  }
}
