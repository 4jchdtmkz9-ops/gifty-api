import { BadRequestException, Body, Controller, Get, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { TelegramAuthService } from '../auth/telegram-auth.service.js';
import { StarPaymentsService } from './star-payments.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
    private readonly stars: StarPaymentsService,
  ) {}

  @Get('stars/rate')
  starsRate() {
    return this.stars.getRate();
  }

  @Post('stars/invoice')
  async createStarsInvoice(@Body() body: { initData?: string; starAmount?: number }) {
    const user = await this.getAuthenticatedUser(body.initData);
    if (body.starAmount === undefined || body.starAmount === null) throw new BadRequestException('Star amount is required');
    return this.stars.createInvoice(user.id, Math.floor(Number(body.starAmount)));
  }

  @Get('stars/deposits/:id')
  async starsDepositStatus(@Param('id') id: string, @Headers('x-telegram-init-data') initData: string) {
    const user = await this.getAuthenticatedUser(initData);
    return this.stars.getDepositStatus(user.id, id);
  }

  private async getAuthenticatedUser(initData?: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const telegramUser = this.telegramAuth.validateInitData(initData);
    const profile = {
      username: telegramUser.username ?? null,
      firstName: telegramUser.first_name ?? null,
      lastName: telegramUser.last_name ?? null,
      photoUrl: telegramUser.photo_url?.startsWith('https://') ? telegramUser.photo_url : null,
    };
    return this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: profile,
      create: { telegramId: String(telegramUser.id), ...profile },
    });
  }
}
