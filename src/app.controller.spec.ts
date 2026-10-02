import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TonService } from './ton.service.js';
import { PrismaService } from './prisma.service.js';
import { TelegramAuthService } from './auth/telegram-auth.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: TonService, useValue: {} },
        { provide: PrismaService, useValue: {} },
        { provide: TelegramAuthService, useValue: {} },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('ORBIT API is running!');
    });
  });
});
