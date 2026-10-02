import { Address, beginCell, Cell } from '@ton/core';
import { BadRequestException } from '@nestjs/common';
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

    const intent = await service.createDepositIntent('user-1', '1.25', walletAddress);
    const [payloadCell] = Cell.fromBoc(Buffer.from(intent.payload, 'base64'));
    const payloadSlice = payloadCell.beginParse();

    expect(intent.address).toBe(depositAddress);
    expect(intent.amountTon).toBe('1.25');
    expect(payloadSlice.loadUint(32)).toBe(0);
    expect(payloadSlice.loadStringTail()).toBe(intent.comment);
    expect(prisma.botDeposit.create).toHaveBeenCalledOnce();
  });

  it('rejects amounts below the minimum deposit', async () => {
    const { service } = makeService();

    await expect(service.createDepositIntent('user-1', '0.09', walletAddress))
      .rejects.toThrow(new BadRequestException('Minimum deposit is 0.1 TON'));
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
});
