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

  it('includes confirmed deposits and withdrawal activity in profile history', async () => {
    const date = new Date('2026-10-02T12:00:00.000Z');
    const prisma = {
      user: { upsert: vi.fn().mockResolvedValue({ id: 'user-1' }) },
      transaction: { findMany: vi.fn().mockResolvedValue([]) },
      offer: { findMany: vi.fn().mockResolvedValue([]) },
      botDeposit: { findMany: vi.fn().mockResolvedValue([{ id: 'deposit-1', status: 'CONFIRMED', receivedTon: '1.25', txHash: 'deposit-hash', confirmedAt: date, createdAt: date }]) },
      botWithdrawal: { findMany: vi.fn().mockResolvedValue([{ id: 'withdrawal-1', status: 'CONFIRMED', amountTon: '0.5', txHash: 'withdrawal-hash', confirmedAt: date, updatedAt: date }]) },
    };
    const auth = { validateInitData: vi.fn().mockReturnValue({ id: 123, username: 'orbit_user' }) };
    const controller = new AppController({} as AppService, {} as TonService, prisma as unknown as PrismaService, auth as unknown as TelegramAuthService);

    const history = await controller.getProfileHistory('validated-init-data');

    expect(history).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'deposit:deposit-1', kind: 'BALANCE', event: 'DEPOSIT', status: 'CONFIRMED', amountTon: '1.25', txHash: 'deposit-hash' }),
      expect.objectContaining({ id: 'withdrawal:withdrawal-1', kind: 'BALANCE', event: 'WITHDRAWAL', status: 'CONFIRMED', amountTon: '0.5', txHash: 'withdrawal-hash' }),
    ]));
  });
});
