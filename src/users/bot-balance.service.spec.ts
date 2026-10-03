import { Address, beginCell, Cell } from '@ton/core';
import { keyPairFromSeed } from '@ton/crypto';
import { WalletContractV4, WalletContractV5R1 } from '@ton/ton';
import { BotBalanceService } from './bot-balance.service.js';
import { PrismaService } from '../prisma.service.js';

const depositAddress = 'UQDcJGY-xnJvW7lH_47DAri0aGxiLhtrQHxz2E4Xhn8XL3Jt';
const walletAddress = 'UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ';
const rawDepositAddress = Address.parse(depositAddress).toRawString();
const rawWalletAddress = Address.parse(walletAddress).toRawString();

function makeService() {
  const prisma = {
    wallet: { findFirst: vi.fn().mockResolvedValue({ address: walletAddress, isConnected: true }) },
    botDeposit: {
      create: vi.fn().mockImplementation(({ data }) => Promise.resolve({
        id: 'deposit-1',
        requestedTon: { toString: () => data.requestedTon },
        comment: data.comment,
        expiresAt: data.expiresAt,
      })),
      findUnique: vi.fn(),
    },
    botWithdrawal: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    user: { updateMany: vi.fn(), update: vi.fn() },
    $transaction: vi.fn(),
  };
  return { service: new BotBalanceService(prisma as unknown as PrismaService), prisma };
}

describe('BotBalanceService deposits', () => {
  it('uses the configured ORBIT deposit address by default', () => {
    const { service } = makeService();
    expect(service.isDepositConfigured()).toBe(true);
  });

  it('creates a TON Connect payload carrying the unique deposit comment', async () => {
    const { service, prisma } = makeService();

    const intent = await service.createDepositIntent('user-1', '0.1', walletAddress);
    const [payloadCell] = Cell.fromBoc(Buffer.from(intent.payload, 'base64'));
    const payloadSlice = payloadCell.beginParse();

    expect(intent.address).toBe(depositAddress);
    expect(intent.amountTon).toBe('0.1');
    expect(payloadSlice.loadUint(32)).toBe(0);
    expect(payloadSlice.loadStringTail()).toBe(intent.comment);
    expect(prisma.botDeposit.create).toHaveBeenCalledOnce();
  });

  it('rejects amounts below the 0.1 TON minimum deposit', async () => {
    const { service } = makeService();

    await expect(service.createDepositIntent('user-1', '0.099', walletAddress))
      .rejects.toThrow('Minimum deposit is 0.1 TON');
  });

  it('credits only a confirmed transfer from the wallet that created the deposit', async () => {
    const { service, prisma } = makeService();
    const comment = 'ORBIT-TEST123';
    const expiresAt = new Date(Date.now() + 60_000);
    const cell = beginCell().storeUint(0, 32).storeStringTail(comment).endCell();
    prisma.botDeposit.findUnique.mockResolvedValue({
      id: 'deposit-1',
      userId: 'user-1',
      status: 'PENDING',
      walletAddress: walletAddress,
      expiresAt,
    });
    const tx = {
      botDeposit: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      user: { update: vi.fn().mockResolvedValue({}) },
    };
    prisma.$transaction.mockImplementation((callback: (client: typeof tx) => Promise<void>) => callback(tx));
    const processTransaction = (service as unknown as {
      processIncomingTransaction: (transaction: unknown, address: string) => Promise<void>;
    }).processIncomingTransaction.bind(service);

    await processTransaction({
      hash: 'ton-transaction-hash',
      now: Math.floor(Date.now() / 1000),
      account: rawDepositAddress,
      description: { aborted: false, compute_ph: { success: true } },
      in_msg: {
        source: rawWalletAddress,
        destination: rawDepositAddress,
        value: '1250000000',
        bounced: false,
        message_content: { body: cell.toBoc().toString('base64') },
      },
    }, rawDepositAddress);

    expect(tx.botDeposit.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'deposit-1', status: 'PENDING', txHash: null },
      data: expect.objectContaining({ status: 'CONFIRMED', receivedTon: '1.25', txHash: 'ton-transaction-hash' }),
    }));
    expect(tx.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { balanceGram: { increment: '1.25' } },
    });
  });

  it('does not credit a transfer from a different source wallet', async () => {
    const { service, prisma } = makeService();
    prisma.botDeposit.findUnique.mockResolvedValue({
      id: 'deposit-1',
      userId: 'user-1',
      status: 'PENDING',
      walletAddress,
      expiresAt: new Date(Date.now() + 60_000),
    });
    const processTransaction = (service as unknown as {
      processIncomingTransaction: (transaction: unknown, address: string) => Promise<void>;
    }).processIncomingTransaction.bind(service);

    await processTransaction({
      hash: 'wrong-wallet-hash',
      in_msg: {
        source: rawDepositAddress,
        destination: rawDepositAddress,
        value: '1250000000',
        message_content: { body: beginCell().storeUint(0, 32).storeStringTail('ORBIT-TEST123').endCell().toBoc().toString('base64') },
      },
    }, rawDepositAddress);

    expect(prisma.botDeposit.findUnique).toHaveBeenCalledOnce();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('reserves a valid withdrawal atomically for the currently connected wallet', async () => {
    const { service, prisma } = makeService();
    vi.spyOn(service as unknown as { getSigner: () => Promise<unknown> }, 'getSigner').mockResolvedValue({});
    const tx = {
      user: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      botWithdrawal: { create: vi.fn().mockResolvedValue({ id: 'withdrawal-1', amountTon: { toString: () => '0.25' }, destination: walletAddress, status: 'PENDING', createdAt: new Date() }) },
    };
    prisma.$transaction.mockImplementation((callback: (client: typeof tx) => Promise<unknown>) => callback(tx));

    const result = await service.createWithdrawal('user-1', '0.25');

    expect(result.amountTon).toBe('0.25');
    expect(tx.user.updateMany).toHaveBeenCalledWith({ where: { id: 'user-1', balanceGram: { gte: '0.25' } }, data: { balanceGram: { decrement: '0.25' } } });
    expect(tx.botWithdrawal.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ userId: 'user-1', amountTon: '0.25', destination: walletAddress, comment: expect.stringMatching(/^ORBIT-WITHDRAW:/) }) }));
  });

  it('rejects withdrawals below 0.01 GRAM before creating a request', async () => {
    const { service } = makeService();
    vi.spyOn(service as unknown as { getSigner: () => Promise<unknown> }, 'getSigner').mockResolvedValue({});
    await expect(service.createWithdrawal('user-1', '0.009')).rejects.toThrow('Minimum withdrawal is 0.01 GRAM');
  });

  it('does not create a withdrawal or debit balance when funds are insufficient', async () => {
    const { service, prisma } = makeService();
    vi.spyOn(service as unknown as { getSigner: () => Promise<unknown> }, 'getSigner').mockResolvedValue({});
    const tx = {
      user: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
      botWithdrawal: { create: vi.fn() },
    };
    prisma.$transaction.mockImplementation((callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    await expect(service.createWithdrawal('user-1', '2')).rejects.toThrow('Insufficient ORBIT balance');
    expect(tx.botWithdrawal.create).not.toHaveBeenCalled();
  });

  it('returns funds when an on-chain-submitted withdrawal is confirmed failed', async () => {
    const { service, prisma } = makeService();
    const tx = {
      botWithdrawal: {
        findFirst: vi.fn().mockResolvedValue({ id: 'withdrawal-1', userId: 'user-1', amountTon: '0.5', status: 'SUBMITTED' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      user: { update: vi.fn().mockResolvedValue({}) },
    };
    prisma.$transaction.mockImplementation((callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    const refund = (service as unknown as { refundWithdrawal: (id: string, reason: string) => Promise<void> }).refundWithdrawal.bind(service);

    await refund('withdrawal-1', 'TON transfer failed on chain');

    expect(tx.botWithdrawal.updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'withdrawal-1', status: 'SUBMITTED' }, data: expect.objectContaining({ status: 'FAILED' }) }));
    expect(tx.user.update).toHaveBeenCalledWith({ where: { id: 'user-1' }, data: { balanceGram: { increment: '0.5' } } });
  });

  it('signs and broadcasts an offline TON payout before marking it submitted', async () => {
    const { service, prisma } = makeService();
    const keys = keyPairFromSeed(Buffer.alloc(32, 7));
    const wallet = WalletContractV4.create({ workchain: 0, publicKey: keys.publicKey });
    const sentBocs: Buffer[] = [];
    const client = {
      open: vi.fn(() => ({ getBalance: vi.fn().mockResolvedValue(1_000_000_000n), getSeqno: vi.fn().mockResolvedValue(4) })),
      sendFile: vi.fn(async (boc: Buffer) => { sentBocs.push(boc); }),
    };
    const signer = { client, wallet, version: 'v4r2' as const, secretKey: keys.secretKey };
    vi.spyOn(service as unknown as { getSigner: () => Promise<unknown> }, 'getSigner').mockResolvedValue(signer);
    const pending = { id: 'withdrawal-1', amountTon: '0.25', destination: walletAddress, comment: 'ORBIT-WITHDRAW:offline-test' };
    prisma.botWithdrawal.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(pending);
    prisma.botWithdrawal.updateMany.mockResolvedValue({ count: 1 });
    prisma.botWithdrawal.update.mockResolvedValue({});
    const processQueue = (service as unknown as { processQueuedWithdrawals: () => Promise<void> }).processQueuedWithdrawals.bind(service);

    await processQueue();

    expect(sentBocs).toHaveLength(1);
    expect(Cell.fromBoc(sentBocs[0])).toHaveLength(1);
    expect(prisma.botWithdrawal.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: pending.id }, data: expect.objectContaining({ status: 'BROADCASTING', walletSeqno: 4, externalHash: expect.any(String) }) }));
    expect(prisma.botWithdrawal.updateMany).toHaveBeenLastCalledWith(expect.objectContaining({ where: { id: pending.id, status: 'BROADCASTING' }, data: expect.objectContaining({ status: 'SUBMITTED' }) }));
  });

  it('also builds a valid signed payout for a matching V5R1 wallet', async () => {
    const { service, prisma } = makeService();
    const keys = keyPairFromSeed(Buffer.alloc(32, 8));
    const wallet = WalletContractV5R1.create({ publicKey: keys.publicKey });
    const sentBocs: Buffer[] = [];
    const client = {
      open: vi.fn(() => ({ getBalance: vi.fn().mockResolvedValue(1_000_000_000n), getSeqno: vi.fn().mockResolvedValue(0) })),
      sendFile: vi.fn(async (boc: Buffer) => { sentBocs.push(boc); }),
    };
    vi.spyOn(service as unknown as { getSigner: () => Promise<unknown> }, 'getSigner').mockResolvedValue({ client, wallet, version: 'v5r1', secretKey: keys.secretKey });
    const pending = { id: 'withdrawal-v5', amountTon: '0.25', destination: walletAddress, comment: 'ORBIT-WITHDRAW:v5-test' };
    prisma.botWithdrawal.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(pending);
    prisma.botWithdrawal.updateMany.mockResolvedValue({ count: 1 });
    prisma.botWithdrawal.update.mockResolvedValue({});
    const processQueue = (service as unknown as { processQueuedWithdrawals: () => Promise<void> }).processQueuedWithdrawals.bind(service);

    await processQueue();

    expect(sentBocs).toHaveLength(1);
    expect(Cell.fromBoc(sentBocs[0])).toHaveLength(1);
  });

  it('restores the reserved balance when the indexed TON wallet transaction failed', async () => {
    const { service, prisma } = makeService();
    const tx = {
      botWithdrawal: {
        findFirst: vi.fn().mockResolvedValue({ id: 'withdrawal-1', userId: 'user-1', amountTon: '0.5', status: 'SUBMITTED' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      user: { update: vi.fn().mockResolvedValue({}) },
    };
    prisma.botWithdrawal.findMany.mockResolvedValue([{ id: 'withdrawal-1', comment: 'ORBIT-WITHDRAW:test', status: 'SUBMITTED', externalHash: Buffer.alloc(32, 1).toString('base64') }]);
    prisma.botWithdrawal.findUnique.mockResolvedValue({ amountTon: '0.5', destination: walletAddress });
    prisma.$transaction.mockImplementation((callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    const processTransaction = (service as unknown as { processOutgoingTransaction: (transaction: unknown, address: string) => Promise<void> }).processOutgoingTransaction.bind(service);

    await processTransaction({ hash: 'chain-tx', trace_external_hash: Buffer.alloc(32, 1).toString('base64url'), account: rawDepositAddress, description: { aborted: true }, out_msgs: [] }, rawDepositAddress);

    expect(tx.botWithdrawal.updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'withdrawal-1', status: 'SUBMITTED' }, data: expect.objectContaining({ status: 'FAILED' }) }));
    expect(tx.user.update).toHaveBeenCalledWith({ where: { id: 'user-1' }, data: { balanceGram: { increment: '0.5' } } });
  });
});
