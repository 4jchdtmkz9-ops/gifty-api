import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service.js';

export const STAR_DEPOSIT_PAYLOAD_PREFIX = 'stars:';
const DEFAULT_GRAM_PER_STAR = '0.01';
export const MIN_STAR_DEPOSIT = 10;
export const MAX_STAR_DEPOSIT = 1_000_000;
export const STAR_DEPOSIT_TTL_MS = 60 * 60 * 1000;

export type StarsRate = {
  gramPerStar: string;
  starsPerGram: number;
  minStars: number;
  maxStars: number;
  presets: number[];
};

type SuccessfulStarPayment = {
  currency?: string;
  total_amount?: number;
  invoice_payload?: string;
  telegram_payment_charge_id?: string;
  provider_payment_charge_id?: string;
};

@Injectable()
export class StarPaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  getRate(): StarsRate {
    const gramPerStar = (this.config.get<string>('STARS_GRAM_PER_STAR') ?? DEFAULT_GRAM_PER_STAR).trim() || DEFAULT_GRAM_PER_STAR;
    const starsPerGram = Math.round(1 / Number(gramPerStar));
    return {
      gramPerStar,
      starsPerGram: Number.isFinite(starsPerGram) && starsPerGram > 0 ? starsPerGram : 100,
      minStars: MIN_STAR_DEPOSIT,
      maxStars: MAX_STAR_DEPOSIT,
      presets: [100, 500, 1000, 5000],
    };
  }

  gramForStars(starAmount: number): string {
    const { gramPerStar } = this.getRate();
    const [whole, fraction = ''] = gramPerStar.split('.');
    const scale = fraction.length;
    const rateUnits = BigInt(whole + fraction);
    const gramUnits = BigInt(starAmount) * rateUnits;
    const divisor = 10n ** BigInt(scale);
    const integerPart = gramUnits / divisor;
    const remainder = (gramUnits % divisor).toString().padStart(scale, '0');
    return remainder === '0'.repeat(scale) ? integerPart.toString() : `${integerPart}.${remainder}`;
  }

  private botToken(): string {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) throw new ServiceUnavailableException('Telegram Stars payments are not configured');
    return token;
  }

  async telegramBotRequest(method: string, payload: Record<string, unknown>) {
    const response = await fetch(`https://api.telegram.org/bot${this.botToken()}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const result = (await response.json().catch(() => null)) as { ok?: boolean; result?: unknown; description?: string } | null;
    if (!response.ok || !result?.ok) {
      throw new ServiceUnavailableException(result?.description ?? `Telegram API request failed: ${method}`);
    }
    return result.result;
  }

  async createInvoice(userId: string, starAmount: number) {
    if (!Number.isInteger(starAmount) || starAmount < MIN_STAR_DEPOSIT || starAmount > MAX_STAR_DEPOSIT) {
      throw new BadRequestException(`Star deposit must be between ${MIN_STAR_DEPOSIT} and ${MAX_STAR_DEPOSIT} Stars`);
    }
    const gramAmount = this.gramForStars(starAmount);
    const deposit = await this.prisma.starDeposit.create({
      data: {
        userId,
        starAmount,
        gramAmount,
        payload: `${STAR_DEPOSIT_PAYLOAD_PREFIX}pending`,
        status: 'PENDING',
        expiresAt: new Date(Date.now() + STAR_DEPOSIT_TTL_MS),
      },
    });
    const payload = `${STAR_DEPOSIT_PAYLOAD_PREFIX}${deposit.id}`;
    await this.prisma.starDeposit.update({ where: { id: deposit.id }, data: { payload } });
    const invoiceLink = (await this.telegramBotRequest('createInvoiceLink', {
      title: 'ORBIT balance top-up',
      description: `${starAmount} Stars → ${gramAmount} GRAM`,
      payload,
      provider_token: '',
      currency: 'XTR',
      prices: [{ label: 'ORBIT balance', amount: starAmount }],
    })) as string;
    return { depositId: deposit.id, invoiceLink, starAmount, gramAmount };
  }

  async getDepositStatus(userId: string, depositId: string) {
    const deposit = await this.prisma.starDeposit.findFirst({ where: { id: depositId, userId } });
    if (!deposit) throw new BadRequestException('Star deposit was not found');
    return {
      id: deposit.id,
      status: deposit.status,
      starAmount: deposit.starAmount,
      gramAmount: deposit.gramAmount.toString(),
      confirmedAt: deposit.confirmedAt?.toISOString() ?? null,
    };
  }

  async answerPreCheckout(query: { id: string; from?: { id: number }; total_amount?: number; invoice_payload?: string }): Promise<boolean> {
    const payload = query.invoice_payload ?? '';
    if (!payload.startsWith(STAR_DEPOSIT_PAYLOAD_PREFIX)) return false;
    const fail = async (message: string) => {
      await this.telegramBotRequest('answerPreCheckoutQuery', { pre_checkout_query_id: query.id, ok: false, error_message: message }).catch(() => undefined);
    };
    const deposit = await this.prisma.starDeposit.findUnique({
      where: { payload },
      include: { user: { select: { telegramId: true } } },
    });
    if (!deposit || deposit.status !== 'PENDING') {
      await fail('This Stars deposit is no longer available');
      return true;
    }
    if (deposit.expiresAt < new Date()) {
      await this.prisma.starDeposit.updateMany({ where: { id: deposit.id, status: 'PENDING' }, data: { status: 'EXPIRED' } });
      await fail('This Stars deposit has expired. Please create a new one.');
      return true;
    }
    if (query.total_amount !== deposit.starAmount || String(query.from?.id ?? '') !== deposit.user.telegramId) {
      await fail('Deposit details do not match. Please try again.');
      return true;
    }
    await this.telegramBotRequest('answerPreCheckoutQuery', { pre_checkout_query_id: query.id, ok: true }).catch(() => undefined);
    return true;
  }

  async confirmSuccessfulPayment(payment: SuccessfulStarPayment): Promise<boolean> {
    const payload = payment.invoice_payload ?? '';
    if (!payload.startsWith(STAR_DEPOSIT_PAYLOAD_PREFIX) || payment.currency !== 'XTR') return false;
    const chargeId = payment.telegram_payment_charge_id;
    if (!chargeId) return false;
    const already = await this.prisma.starDeposit.findUnique({ where: { chargeId } });
    if (already?.status === 'CONFIRMED') return true;
    await this.prisma.$transaction(async (tx) => {
      const deposit = await tx.starDeposit.findUnique({ where: { payload } });
      if (!deposit || deposit.status !== 'PENDING') return;
      if (payment.total_amount !== deposit.starAmount) return;
      await tx.starDeposit.update({
        where: { id: deposit.id },
        data: { status: 'CONFIRMED', chargeId, providerChargeId: payment.provider_payment_charge_id ?? null, confirmedAt: new Date() },
      });
      await tx.user.update({ where: { id: deposit.userId }, data: { balanceGram: { increment: deposit.gramAmount.toString() } } });
      await tx.gameTransaction.create({
        data: {
          userId: deposit.userId,
          game: 'STARS',
          type: 'DEPOSIT',
          reference: `stars:${deposit.id}`,
          amountGram: deposit.gramAmount.toString(),
          details: { starAmount: deposit.starAmount, chargeId },
        },
      });
    });
    return true;
  }
}
