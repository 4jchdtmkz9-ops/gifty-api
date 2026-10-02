import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Address, beginCell, Cell } from '@ton/core';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';

const NANO = 1_000_000_000n;
const MIN_DEPOSIT_NANO = 100_000_000n;
const DEPOSIT_LIFETIME_MS = 30 * 60 * 1000;
const DEPOSIT_INDEXING_GRACE_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 20_000;
const DEFAULT_DEPOSIT_ADDRESS = 'UQDcJGY-xnJvW7lH_47DAri0aGxiLhtrQHxz2E4Xhn8XL3Jt';

type IndexedTransaction = {
  hash?: string;
  now?: number;
  account?: string;
  description?: { aborted?: boolean; compute_ph?: { success?: boolean } };
  in_msg?: {
    source?: string;
    destination?: string;
    value?: string;
    bounced?: boolean;
    message_content?: { body?: string };
  } | null;
};

function canonicalAddress(value: string) {
  return Address.parse(value).toRawString();
}

function toNano(value: string) {
  if (!/^\d+(\.\d{1,9})?$/.test(value)) throw new BadRequestException('Enter an amount with up to 9 decimal places');
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * NANO + BigInt(fraction.padEnd(9, '0'));
}

function fromNano(value: bigint) {
  const whole = value / NANO;
  const fraction = (value % NANO).toString().padStart(9, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

function readComment(body: string | undefined) {
  if (!body) return null;
  try {
    const [cell] = Cell.fromBoc(Buffer.from(body, 'base64'));
    if (!cell) return null;
    const slice = cell.beginParse();
    if (slice.remainingBits < 32 || slice.loadUint(32) !== 0) return null;
    return slice.loadStringTail();
  } catch {
    return null;
  }
}

@Injectable()
export class BotBalanceService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BotBalanceService.name);
  private timer?: NodeJS.Timeout;
  private polling = false;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    if (!this.isDepositConfigured()) return;
    void this.reconcileDeposits();
    this.timer = setInterval(() => void this.reconcileDeposits(), POLL_INTERVAL_MS);
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  private getDepositAddress() {
    return process.env.TON_DEPOSIT_ADDRESS?.trim() || DEFAULT_DEPOSIT_ADDRESS;
  }

  isDepositConfigured() {
    try { canonicalAddress(this.getDepositAddress()); return true; } catch { return false; }
  }

  async getBalance(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { balanceGram: true },
    });
    return { balanceGram: user.balanceGram.toString(), depositConfigured: this.isDepositConfigured() };
  }

  async createDepositIntent(userId: string, amountText: string, walletText: string) {
    const depositAddress = this.getDepositAddress();
    if (!this.isDepositConfigured()) {
      throw new ServiceUnavailableException('ORBIT deposits are not configured yet');
    }
    const requestedNano = toNano(amountText);
    if (requestedNano < MIN_DEPOSIT_NANO) throw new BadRequestException('Minimum deposit is 0.1 TON');
    if (requestedNano > 1_000_000n * NANO) throw new BadRequestException('Deposit exceeds the maximum allowed amount');

    let walletAddress: string;
    let canonicalWallet: string;
    try {
      walletAddress = Address.parse(walletText).toString({ bounceable: false, urlSafe: true });
      canonicalWallet = canonicalAddress(walletText);
    } catch {
      throw new BadRequestException('A valid connected TON wallet is required');
    }
    const connectedWallet = await this.prisma.wallet.findFirst({ where: { userId, isConnected: true } });
    if (!connectedWallet || canonicalAddress(connectedWallet.address) !== canonicalWallet) {
      throw new ConflictException('Connect and sync your TON wallet before depositing');
    }

    const address = Address.parse(depositAddress);
    const friendlyDepositAddress = address.toString({ bounceable: false, urlSafe: true });
    const comment = `ORBIT-${randomBytes(12).toString('hex').toUpperCase()}`;
    const payload = beginCell().storeUint(0, 32).storeStringTail(comment).endCell().toBoc().toString('base64');
    const expiresAt = new Date(Date.now() + DEPOSIT_LIFETIME_MS);
    const deposit = await this.prisma.botDeposit.create({
      data: {
        userId,
        requestedTon: fromNano(requestedNano),
        depositAddress: friendlyDepositAddress,
        walletAddress,
        comment,
        expiresAt,
      },
      select: { id: true, requestedTon: true, comment: true, expiresAt: true },
    });

    return {
      id: deposit.id,
      amountTon: deposit.requestedTon.toString(),
      address: friendlyDepositAddress,
      comment: deposit.comment,
      payload,
      expiresAt: deposit.expiresAt,
    };
  }

  async getDepositStatus(userId: string, depositId: string) {
    const deposit = await this.prisma.botDeposit.findFirst({
      where: { id: depositId, userId },
      select: { id: true, status: true, requestedTon: true, receivedTon: true, txHash: true, expiresAt: true },
    });
    if (!deposit) throw new BadRequestException('Deposit was not found');
    return {
      ...deposit,
      requestedTon: deposit.requestedTon.toString(),
      receivedTon: deposit.receivedTon?.toString() ?? null,
    };
  }

  private async reconcileDeposits() {
    if (this.polling || !this.isDepositConfigured()) return;
    this.polling = true;
    try {
      const rawAddress = canonicalAddress(this.getDepositAddress());
      const apiKey = process.env.TONCENTER_API_KEY?.trim();
      const endpoint = `https://toncenter.com/api/v3/transactions?account=${encodeURIComponent(rawAddress)}&limit=1000&sort=desc`;
      const response = await fetch(endpoint, {
        headers: apiKey ? { 'X-API-Key': apiKey } : undefined,
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) throw new Error(`TON Center returned HTTP ${response.status}`);
      const result = await response.json() as { transactions?: IndexedTransaction[] };
      for (const transaction of result.transactions ?? []) await this.processIncomingTransaction(transaction, rawAddress);
      await this.prisma.botDeposit.updateMany({
        where: { status: 'PENDING', expiresAt: { lt: new Date(Date.now() - DEPOSIT_INDEXING_GRACE_MS) } },
        data: { status: 'EXPIRED' },
      });
    } catch (error) {
      this.logger.warn(`Deposit scan failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    } finally {
      this.polling = false;
    }
  }

  private async processIncomingTransaction(transaction: IndexedTransaction, depositAddress: string) {
    const message = transaction.in_msg;
    if (!message || message.bounced || !transaction.hash || !message.source || !message.destination || !message.value) return;
    if (transaction.description?.aborted === true || transaction.description?.compute_ph?.success === false) return;
    try {
      if (canonicalAddress(message.destination) !== depositAddress) return;
      if (transaction.account && canonicalAddress(transaction.account) !== depositAddress) return;
    } catch { return; }

    const comment = readComment(message.message_content?.body);
    if (!comment) return;
    const deposit = await this.prisma.botDeposit.findUnique({ where: { comment } });
    if (!deposit || deposit.status !== 'PENDING') return;
    const transactionTime = transaction.now ? new Date(transaction.now * 1000) : new Date();
    if (transactionTime.getTime() > deposit.expiresAt.getTime()) return;

    let sourceAddress: string;
    try { sourceAddress = canonicalAddress(message.source); } catch { return; }
    try {
      if (sourceAddress !== canonicalAddress(deposit.walletAddress)) return;
    } catch { return; }

    let receivedNano: bigint;
    try { receivedNano = BigInt(message.value); } catch { return; }
    if (receivedNano <= 0n) return;
    const receivedTon = fromNano(receivedNano);
    try {
      await this.prisma.$transaction(async (tx) => {
        const claimed = await tx.botDeposit.updateMany({
          where: { id: deposit.id, status: 'PENDING', txHash: null },
          data: { status: 'CONFIRMED', receivedTon, txHash: transaction.hash, confirmedAt: transactionTime },
        });
        if (claimed.count !== 1) return;
        await tx.user.update({ where: { id: deposit.userId }, data: { balanceGram: { increment: receivedTon } } });
      });
    } catch (error) {
      if ((error as { code?: string })?.code !== 'P2002') throw error;
    }
  }
}
