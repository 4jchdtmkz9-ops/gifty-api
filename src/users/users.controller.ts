import {
  Body,
  Controller,
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
        username: 'gifty_test',
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

    const user = await this.prisma.user.upsert({
      where: {
        telegramId: String(telegramUser.id),
      },
      update: {
        username: telegramUser.username ?? null,
      },
      create: {
        telegramId: String(telegramUser.id),
        username: telegramUser.username ?? null,
      },
    });

    return user;
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

    const user = await this.prisma.user.findUnique({
      where: {
        telegramId: String(telegramUser.id),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Telegram user is not registered');
    }

    const wallet = await this.prisma.wallet.upsert({
      where: {
        address: body.address,
      },
      update: {
        userId: user.id,
        network: body.network ?? 'TON',
      },
      create: {
        address: body.address,
        network: body.network ?? 'TON',
        userId: user.id,
      },
    });

    return wallet;
  }
}