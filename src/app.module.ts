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
import { TelegramRelayController } from './telegram/telegram-relay.controller.js';
import { TelegramRelayService } from './telegram/telegram-relay.service.js';
import { GiveawaysController } from './giveaways/giveaways.controller.js';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, UsersController, PvpController, GamesController, TelegramRelayController, GiveawaysController],
  providers: [
  AppService,
  PrismaService,
  TelegramAuthService,
  TonService,
  BotBalanceService,
  TelegramRelayService,
],
})
export class AppModule {}
