import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Address, beginCell, Cell, internal, SendMode } from '@ton/core';
import { mnemonicToPrivateKey } from '@ton/crypto';
import { TonClient, WalletContractV4, WalletContractV5R1 } from '@ton/ton';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma.service.js';

const NANO = 1_000_000_000n;
const MIN_DEPOSIT_NANO = 100_000_000n;
const MIN_WITHDRAWAL_NANO = 10_000_000n;
const WITHDRAWAL_FEE_RESERVE_NANO = 50_000_000n;
const DEPOSIT_LIFETIME_MS = 30 * 60 * 1000;
const DEPOSIT_INDEXING_GRACE_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 20_000;
const DEFAULT_DEPOSIT_ADDRESS = 'UQDcJGY-xnJvW7lH_47DAri0aGxiLhtrQHxz2E4Xhn8XL3Jt';

type IndexedTransaction = {
  hash?: string;
  trace_external_hash?: string;
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
  out_msgs?: Array<{ destination?: string; value?: string; message_content?: { body?: string } }>;
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

function sameHash(left: string | undefined, right: string | undefined) {
  if (!left || !right) return false;
  const normalized = (value: string) => {
    const trimmed = value.trim().replace(/-/g, '+').replace(/_/g, '/').replace(/=+$/, '');
    try {
      if (/^[0-9a-f]{64}$/i.test(trimmed)) return Buffer.from(trimmed, 'hex').toString('hex');
      return Buffer.from(trimmed, 'base64').toString('hex');
    } catch { return trimmed; }
  };
  return normalized(left) === normalized(right);
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
  private signer?: { client: TonClient; wallet: WalletContractV4 | WalletContractV5R1; version: 'v4r2' | 'v5r1'; secretKey: Buffer };
  private signerChecked = false;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    if (!this.isDepositConfigured() && !process.env.TON_WITHDRAWAL_MNEMONIC) return;
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
    return { balanceGram: user.balanceGram.toString(), depositConfigured: this.isDepositConfigured(), withdrawalConfigured: await this.isWithdrawalConfigured() };
  }

  async createWithdrawal(userId: string, amountText: string) {
    if (!(await this.isWithdrawalConfigured())) throw new ServiceUnavailableException('ORBIT withdrawals are not configured');
    const amountNano = toNano(amountText);
    if (amountNano < MIN_WITHDRAWAL_NANO) throw new BadRequestException('Minimum withdrawal is 0.01 GRAM');
    if (amountNano > 1_000_000n * NANO) throw new BadRequestException('Withdrawal exceeds the maximum allowed amount');
    const wallet = await this.prisma.wallet.findFirst({ where: { userId, isConnected: true }, orderBy: { createdAt: 'desc' } });
    if (!wallet) throw new ConflictException('Connect a TON wallet before withdrawing');
    let destination: string;
    try { destination = Address.parse(wallet.address).toString({ bounceable: false, urlSafe: true }); }
    catch { throw new ConflictException('The connected wallet address is invalid'); }
    const comment = `ORBIT-WITHDRAW:${randomBytes(12).toString('hex')}`;
    const amountTon = fromNano(amountNano);
    try {
      const withdrawal = await this.prisma.$transaction(async (tx) => {
        const debited = await tx.user.updateMany({ where: { id: userId, balanceGram: { gte: amountTon } }, data: { balanceGram: { decrement: amountTon } } });
        if (debited.count !== 1) throw new ConflictException('Insufficient ORBIT balance');
        return tx.botWithdrawal.create({ data: { userId, amountTon, destination, comment }, select: { id: true, amountTon: true, destination: true, status: true, createdAt: true } });
      });
      return { ...withdrawal, amountTon: withdrawal.amountTon.toString() };
    } catch (error) {
      if ((error as { code?: string })?.code === 'P2002') throw new ConflictException('You already have a withdrawal in progress');
      throw error;
    }
  }

  async getWithdrawalStatus(userId: string, id: string) {
    const withdrawal = await this.prisma.botWithdrawal.findFirst({ where: { id, userId }, select: { id: true, amountTon: true, destination: true, status: true, failureReason: true, txHash: true, createdAt: true, confirmedAt: true } });
    if (!withdrawal) throw new BadRequestException('Withdrawal was not found');
    return { ...withdrawal, amountTon: withdrawal.amountTon.toString() };
  }

  private async isWithdrawalConfigured() {
    try { return !!(await this.getSigner()); } catch { return false; }
  }

  private async getSigner() {
    if (this.signerChecked) return this.signer ?? null;
    this.signerChecked = true;
    const words = process.env.TON_WITHDRAWAL_MNEMONIC?.trim().split(/\s+/).filter(Boolean);
    if (!words || words.length < 12) return null;
    try {
      const key = await mnemonicToPrivateKey(words);
      const expectedAddress = canonicalAddress(this.getDepositAddress());
      const v4 = WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });
      const v5 = WalletContractV5R1.create({ publicKey: key.publicKey });
      const v4Matches = canonicalAddress(v4.address.toString()) === expectedAddress;
      const v5Matches = canonicalAddress(v5.address.toString()) === expectedAddress;
      if (!v4Matches && !v5Matches) {
        this.logger.error('Withdrawal wallet does not match TON_DEPOSIT_ADDRESS; withdrawals remain disabled');
        return null;
      }
      const apiKey = process.env.TONCENTER_API_KEY?.trim();
      const client = new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC', ...(apiKey ? { apiKey } : {}) });
      this.signer = { client, wallet: v4Matches ? v4 : v5, version: v4Matches ? 'v4r2' : 'v5r1', secretKey: key.secretKey };
      return this.signer;
    } catch (error) {
      this.logger.error(`Withdrawal wallet configuration is invalid: ${error instanceof Error ? error.message : 'unknown error'}`);
      return null;
    }
  }

  private async processQueuedWithdrawals() {
    const signer = await this.getSigner();
    if (!signer) return;
    // TON wallets use one account-wide seqno. Keep payouts strictly serial until
    // the previous transaction is visible in the indexer to avoid signing two
    // different transfers with the same seqno across API instances.
    const inFlight = await this.prisma.botWithdrawal.findFirst({ where: { status: { in: ['PROCESSING', 'BROADCASTING', 'SUBMITTED'] } }, select: { id: true } });
    if (inFlight) return;
    const pending = await this.prisma.botWithdrawal.findFirst({ where: { status: 'PENDING' }, orderBy: { createdAt: 'asc' } });
    if (!pending) return;
    let claimed: { count: number };
    try {
      claimed = await this.prisma.botWithdrawal.updateMany({ where: { id: pending.id, status: 'PENDING' }, data: { status: 'PROCESSING' } });
    } catch (error) {
      if ((error as { code?: string })?.code === 'P2002') return;
      throw error;
    }
    if (claimed.count !== 1) return;
    try {
      const opened = signer.client.open(signer.wallet);
      const balance = await opened.getBalance();
      const payoutNano = toNano(pending.amountTon.toString());
      if (balance < payoutNano + WITHDRAWAL_FEE_RESERVE_NANO) throw new Error('ORBIT payout wallet needs more TON for this withdrawal and network fees');
      const seqno = await opened.getSeqno();
      const body = beginCell().storeUint(0, 32).storeStringTail(pending.comment).endCell();
      const message = internal({ to: Address.parse(pending.destination), value: payoutNano, body, bounce: false });
      const signed = signer.version === 'v4r2'
        ? (signer.wallet as WalletContractV4).createTransfer({ seqno, secretKey: signer.secretKey, messages: [message], sendMode: SendMode.PAY_GAS_SEPARATELY, timeout: Math.floor(Date.now() / 1000) + 60 })
        : (signer.wallet as WalletContractV5R1).createTransfer({ seqno, secretKey: signer.secretKey, messages: [message], sendMode: SendMode.PAY_GAS_SEPARATELY, timeout: Math.floor(Date.now() / 1000) + 60, authType: 'external' });
      const externalHash = signed.hash().toString('base64');
      await this.prisma.botWithdrawal.update({ where: { id: pending.id }, data: { status: 'BROADCASTING', walletSeqno: seqno, externalHash } });
      await signer.client.sendFile(signed.toBoc());
      await this.prisma.botWithdrawal.updateMany({ where: { id: pending.id, status: 'BROADCASTING' }, data: { status: 'SUBMITTED', submittedAt: new Date() } });
    } catch (error) {
      const current = await this.prisma.botWithdrawal.findUnique({ where: { id: pending.id }, select: { status: true } });
      if (current?.status === 'PROCESSING') await this.refundWithdrawal(pending.id, error instanceof Error ? error.message : 'Payout could not be submitted');
      else this.logger.warn(`Withdrawal ${pending.id} broadcast needs reconciliation: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  private async refundWithdrawal(id: string, reason: string) {
    await this.prisma.$transaction(async (tx) => {
      const withdrawal = await tx.botWithdrawal.findFirst({ where: { id, status: { in: ['PROCESSING', 'PENDING', 'BROADCASTING', 'SUBMITTED'] } } });
      if (!withdrawal) return;
      const changed = await tx.botWithdrawal.updateMany({ where: { id, status: withdrawal.status }, data: { status: 'FAILED', failureReason: reason.slice(0, 240) } });
      if (changed.count === 1) await tx.user.update({ where: { id: withdrawal.userId }, data: { balanceGram: { increment: withdrawal.amountTon } } });
    });
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
      await this.prisma.botWithdrawal.updateMany({
        where: { status: 'PROCESSING', updatedAt: { lt: new Date(Date.now() - 2 * 60_000) } },
        data: { status: 'PENDING' },
      });
      for (const transaction of result.transactions ?? []) {
        await this.processIncomingTransaction(transaction, rawAddress);
        await this.processOutgoingTransaction(transaction, rawAddress);
      }
      await this.refundProvablyUnsentWithdrawals();
      await this.prisma.botDeposit.updateMany({
        where: { status: 'PENDING', expiresAt: { lt: new Date(Date.now() - DEPOSIT_INDEXING_GRACE_MS) } },
        data: { status: 'EXPIRED' },
      });
      await this.processQueuedWithdrawals();
    } catch (error) {
      this.logger.warn(`Deposit scan failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    } finally {
      this.polling = false;
    }
  }

  private async refundProvablyUnsentWithdrawals() {
    const signer = await this.getSigner();
    if (!signer) return;
    const cutoff = new Date(Date.now() - 2 * 60_000);
    const stale = await this.prisma.botWithdrawal.findMany({
      where: { status: { in: ['BROADCASTING', 'SUBMITTED'] }, updatedAt: { lt: cutoff }, walletSeqno: { not: null } },
      select: { id: true, comment: true, walletSeqno: true, status: true },
    });
    if (stale.length === 0) return;
    const opened = signer.client.open(signer.wallet);
    const currentSeqno = await opened.getSeqno();
    for (const withdrawal of stale) {
      // The signed external message expires after 60 seconds. If the wallet
      // still has the exact seqno after a two-minute indexer window, it could
      // not have executed. A consumed seqno is deliberately left reserved for
      // transaction reconciliation instead of risking a duplicate payout.
      if (currentSeqno === withdrawal.walletSeqno) {
        await this.refundWithdrawal(withdrawal.id, 'TON wallet did not accept the payout before the signed request expired');
      }
    }
  }

  private async processOutgoingTransaction(transaction: IndexedTransaction, hotWalletAddress: string) {
    if (!transaction.hash) return;
    try { if (transaction.account && canonicalAddress(transaction.account) !== hotWalletAddress) return; } catch { return; }
    const active = await this.prisma.botWithdrawal.findMany({ where: { status: { in: ['BROADCASTING', 'SUBMITTED'] } }, select: { id: true, comment: true, status: true, externalHash: true } });
    if (active.length === 0) return;
    const messages = transaction.out_msgs ?? [];
    for (const withdrawal of active) {
      const details = await this.prisma.botWithdrawal.findUnique({ where: { id: withdrawal.id }, select: { amountTon: true, destination: true } });
      if (!details) continue;
      const amountNano = toNano(details.amountTon.toString());
      const matched = (!!withdrawal.externalHash && sameHash(transaction.trace_external_hash, withdrawal.externalHash)) || messages.some((message) => {
        try {
          return readComment(message.message_content?.body) === withdrawal.comment && !!message.destination && canonicalAddress(message.destination) === canonicalAddress(details.destination) && !!message.value && BigInt(message.value) >= amountNano;
        } catch { return false; }
      });
      if (!matched) continue;
      if (transaction.description?.aborted === true || transaction.description?.compute_ph?.success === false) {
        await this.refundWithdrawal(withdrawal.id, 'TON transfer failed on chain');
      } else {
        await this.prisma.botWithdrawal.updateMany({ where: { id: withdrawal.id, status: { in: ['BROADCASTING', 'SUBMITTED'] } }, data: { status: 'CONFIRMED', txHash: transaction.hash, confirmedAt: transaction.now ? new Date(transaction.now * 1000) : new Date() } });
      }
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
