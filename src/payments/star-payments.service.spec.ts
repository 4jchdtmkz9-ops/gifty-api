import { StarPaymentsService } from './star-payments.service.js';
import type { PrismaService } from '../prisma.service.js';

function makeService(env: Record<string, string | undefined> = {}, prismaOverrides: Record<string, unknown> = {}) {
  const config = { get: (key: string) => env[key] };
  const prisma = {
    starDeposit: { create: vi.fn(), update: vi.fn(), findUnique: vi.fn(), findFirst: vi.fn(), updateMany: vi.fn() },
    user: { update: vi.fn() },
    gameTransaction: { create: vi.fn() },
    $transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) => fn(prisma)),
    ...prismaOverrides,
  };
  const service = new StarPaymentsService(prisma as unknown as PrismaService, config as never);
  return { service, prisma, config };
}

describe('StarPaymentsService', () => {
  describe('getRate', () => {
    it('defaults to 1 Star = 0.01 GRAM', () => {
      const { service } = makeService();
      expect(service.getRate()).toMatchObject({ gramPerStar: '0.01', starsPerGram: 100, minStars: 10 });
    });

    it('honours STARS_GRAM_PER_STAR', () => {
      const { service } = makeService({ STARS_GRAM_PER_STAR: '0.05' });
      expect(service.getRate()).toMatchObject({ gramPerStar: '0.05', starsPerGram: 20 });
    });
  });

  describe('gramForStars', () => {
    it('computes exact GRAM values without float drift', () => {
      const { service } = makeService();
      expect(service.gramForStars(1)).toBe('0.01');
      expect(service.gramForStars(100)).toBe('1');
      expect(service.gramForStars(5000)).toBe('50');
      expect(service.gramForStars(1_000_000)).toBe('10000');
    });

    it('follows a custom rate exactly', () => {
      const { service } = makeService({ STARS_GRAM_PER_STAR: '0.025' });
      expect(service.gramForStars(40)).toBe('1');
      expect(service.gramForStars(1)).toBe('0.025');
    });
  });

  describe('createInvoice', () => {
    it('rejects out-of-range amounts before touching Telegram', async () => {
      const { service, prisma } = makeService();
      const spy = vi.spyOn(service, 'telegramBotRequest');
      await expect(service.createInvoice('user-1', 9)).rejects.toThrow('between 10 and 1000000');
      await expect(service.createInvoice('user-1', 1_000_001)).rejects.toThrow('between 10 and 1000000');
      await expect(service.createInvoice('user-1', NaN)).rejects.toThrow('between 10 and 1000000');
      expect(spy).not.toHaveBeenCalled();
      expect(prisma.starDeposit.create).not.toHaveBeenCalled();
    });

    it('stores a unique random payload and returns the invoice link', async () => {
      const { service, prisma } = makeService({ TELEGRAM_BOT_TOKEN: 'token' });
      prisma.starDeposit.create.mockResolvedValue({ id: 'dep-1' });
      vi.spyOn(service, 'telegramBotRequest').mockResolvedValue('https://t.me/$invoice');
      const first = await service.createInvoice('user-1', 500);
      const second = await service.createInvoice('user-1', 500);
      expect(first).toMatchObject({ depositId: 'dep-1', invoiceLink: 'https://t.me/$invoice', starAmount: 500, gramAmount: '5' });
      const payloads = (prisma.starDeposit.create.mock.calls as Array<[{ data: { payload: string } }]>).map(([args]) => args.data.payload);
      expect(payloads[0]).toMatch(/^stars:[0-9a-f]{16}$/);
      expect(payloads[0]).not.toBe(payloads[1]);
      expect(service.telegramBotRequest).toHaveBeenCalledWith('createInvoiceLink', expect.objectContaining({ currency: 'XTR', provider_token: '' }));
    });
  });

  describe('answerPreCheckout', () => {
    it('ignores foreign payloads', async () => {
      const { service } = makeService();
      const spy = vi.spyOn(service, 'telegramBotRequest');
      expect(await service.answerPreCheckout({ id: 'q', invoice_payload: 'other:1' })).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });

    it('rejects expired deposits', async () => {
      const { service, prisma } = makeService({ TELEGRAM_BOT_TOKEN: 'token' });
      prisma.starDeposit.findUnique.mockResolvedValue({ id: 'd', status: 'PENDING', starAmount: 100, expiresAt: new Date(Date.now() - 1000), user: { telegramId: '7' } });
      const answer = vi.spyOn(service, 'telegramBotRequest').mockResolvedValue(true);
      expect(await service.answerPreCheckout({ id: 'q', from: { id: 7 }, total_amount: 100, invoice_payload: 'stars:abc' })).toBe(true);
      expect(answer).toHaveBeenCalledWith('answerPreCheckoutQuery', expect.objectContaining({ ok: false }));
      expect(prisma.starDeposit.updateMany).toHaveBeenCalledWith(expect.objectContaining({ data: { status: 'EXPIRED' } }));
    });

    it('rejects amount or owner mismatch', async () => {
      const { service, prisma } = makeService({ TELEGRAM_BOT_TOKEN: 'token' });
      prisma.starDeposit.findUnique.mockResolvedValue({ id: 'd', status: 'PENDING', starAmount: 100, expiresAt: new Date(Date.now() + 60000), user: { telegramId: '7' } });
      const answer = vi.spyOn(service, 'telegramBotRequest').mockResolvedValue(true);
      await service.answerPreCheckout({ id: 'q', from: { id: 7 }, total_amount: 50, invoice_payload: 'stars:abc' });
      await service.answerPreCheckout({ id: 'q', from: { id: 8 }, total_amount: 100, invoice_payload: 'stars:abc' });
      expect(answer).toHaveBeenCalledTimes(2);
      expect(answer).toHaveBeenCalledWith('answerPreCheckoutQuery', expect.objectContaining({ ok: false }));
    });

    it('approves a matching deposit', async () => {
      const { service, prisma } = makeService({ TELEGRAM_BOT_TOKEN: 'token' });
      prisma.starDeposit.findUnique.mockResolvedValue({ id: 'd', status: 'PENDING', starAmount: 100, expiresAt: new Date(Date.now() + 60000), user: { telegramId: '7' } });
      const answer = vi.spyOn(service, 'telegramBotRequest').mockResolvedValue(true);
      expect(await service.answerPreCheckout({ id: 'q', from: { id: 7 }, total_amount: 100, invoice_payload: 'stars:abc' })).toBe(true);
      expect(answer).toHaveBeenCalledWith('answerPreCheckoutQuery', { pre_checkout_query_id: 'q', ok: true });
    });
  });

  describe('confirmSuccessfulPayment', () => {
    it('ignores non-Stars payments and unknown deposits without writing', async () => {
      const { service, prisma } = makeService();
      expect(await service.confirmSuccessfulPayment({ currency: 'USD', total_amount: 100, invoice_payload: 'stars:abc', telegram_payment_charge_id: 'c1' })).toBe(false);
      prisma.starDeposit.findUnique.mockResolvedValue(null);
      expect(await service.confirmSuccessfulPayment({ currency: 'XTR', total_amount: 100, invoice_payload: 'stars:abc', telegram_payment_charge_id: 'c1' })).toBe(true);
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(prisma.gameTransaction.create).not.toHaveBeenCalled();
    });

    it('credits Stars once and is idempotent on redelivery', async () => {
      const { service, prisma } = makeService();
      const pending = { id: 'd', userId: 'u1', status: 'PENDING', starAmount: 500, gramAmount: { toString: () => '5' } };
      prisma.starDeposit.findUnique.mockImplementation(async ({ where }: { where: { chargeId?: string; payload?: string } }) => {
        if (where.chargeId) return null;
        return pending;
      });
      const payment = { currency: 'XTR', total_amount: 500, invoice_payload: 'stars:abc', telegram_payment_charge_id: 'charge-1' };
      expect(await service.confirmSuccessfulPayment(payment)).toBe(true);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 'u1' }, data: { balanceStars: { increment: 500 } } });
      expect(prisma.gameTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ userId: 'u1', game: 'STARS', type: 'DEPOSIT', reference: 'stars:d' }),
      }));

      prisma.starDeposit.findUnique.mockResolvedValue({ ...pending, status: 'CONFIRMED' });
      prisma.user.update.mockClear();
      expect(await service.confirmSuccessfulPayment(payment)).toBe(true);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('does not credit on amount mismatch', async () => {
      const { service, prisma } = makeService();
      prisma.starDeposit.findUnique.mockResolvedValue({ id: 'd', userId: 'u1', status: 'PENDING', starAmount: 500, gramAmount: { toString: () => '5' } });
      expect(await service.confirmSuccessfulPayment({ currency: 'XTR', total_amount: 100, invoice_payload: 'stars:abc', telegram_payment_charge_id: 'c9' })).toBe(true);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});
