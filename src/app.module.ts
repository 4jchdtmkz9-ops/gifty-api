import { TonService } from './ton.service.js';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js';
import { UsersController } from './users/users.controller.js';
import { TelegramAuthService } from './auth/telegram-auth.service.js';
import { PvpController } from './pvp/pvp.controller.js';
import { BotBalanceService } from './users/bot-balance.service.js';
import { GamesController } from './games/games.controller.js';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, UsersController, PvpController, GamesController],
  providers: [
  AppService,
  PrismaService,
  TelegramAuthService,
  TonService,
  BotBalanceService,
],
})
export class AppModule {}
