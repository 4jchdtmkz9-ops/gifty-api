import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { AppService } from './app.service.js';
import { TonService } from './ton.service.js';
import { PrismaService } from './prisma.service.js';
import { TelegramAuthService } from './auth/telegram-auth.service.js';

const DEMO_BACKDROP_COLLECTION = '__ORBIT_DEMO_BACKDROP__';
const DEMO_BACKDROP_PALETTE: Record<string, string> = {
  'Celtic Blue': '#2877bb', Cappuccino: '#b28a6b', 'Pine Green': '#27634a', Raspberry: '#d82f68',
  Persimmon: '#e8783f', 'Mystic Pearl': '#b05670', Platinum: '#d5d9df', Rosewood: '#70404e',
  'Pure Gold': '#e5b83e', Black: '#17191d', 'Onyx Black': '#202329', 'Midnight Blue': '#172c55',
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tonService: TonService,
    private readonly prisma: PrismaService,
    private readonly telegramAuth: TelegramAuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ton/balance')
  async getTonBalance(@Query('address') address: string) {
    return this.tonService.getBalance(address);
  }

  @Get('gifts')
  async getGifts() {
    return this.prisma.gift.findMany({
      where: { status: 'LISTED', ownerId: null },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
  @Get('gifts/owned')
  async getOwnedGifts(@Query('initData') initData: string) {
  if (!initData) {
    throw new UnauthorizedException('initData is required');
  }

  const telegramUser = this.telegramAuth.validateInitData(initData);

  const user = await this.prisma.user.upsert({
    where: { telegramId: String(telegramUser.id) },
    update: { username: telegramUser.username ?? null },
    create: {
      telegramId: String(telegramUser.id),
      username: telegramUser.username ?? null,
    },
  });

  return this.prisma.gift.findMany({
    where: {
      ownerId: user.id,
      status: 'OWNED',
      collection: { not: DEMO_BACKDROP_COLLECTION },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

  @Get('demo/backdrops')
  async getDemoBackdrops(@Query('initData') initData: string) {
    const user = await this.getOrCreateTelegramUser(initData);
    return this.listDemoBackdrops(user.id);
  }

  @Post('demo/backdrops/sync')
  async syncDemoBackdrops(@Body() body: { initData?: string; items?: Array<{ id: string; name: string; packId?: string }> }) {
    const user = await this.getOrCreateTelegramUser(body.initData);
    // Inventory is authoritative on the server; never import client-provided items.
    return this.listDemoBackdrops(user.id);
  }

  @Get('demo/backdrops/supply')
  async getBackdropPackSupply() {
    const packs = ['sweeties', 'orbit-dog'] as const;
    const purchases = await Promise.all(packs.map((packId) => this.prisma.gameTransaction.count({ where: { game: 'ORBIT_NFT', type: `PURCHASE_${packId.toUpperCase().replace('-', '_')}` } })));
    return Object.fromEntries(packs.map((packId, index) => [packId, { limit: 500, sold: Math.min(500, purchases[index]), remaining: Math.max(0, 500 - purchases[index]) }]));
  }

  @Post('demo/backdrops/purchase')
  async purchaseBackdropPack(@Body() body: { initData?: string; packId?: string; requestId?: string }) {
    const user = await this.getOrCreateTelegramUser(body.initData);
    const packId = body.packId;
    const pack = packId === 'sweeties' ? { price: '0.25', type: 'PURCHASE_SWEETIES' } : packId === 'orbit-dog' ? { price: '0.35', type: 'PURCHASE_ORBIT_DOG' } : null;
    if (!pack) throw new BadRequestException('Unknown ORBIT NFT pack');
    if (!body.requestId || !/^[A-Za-z0-9_-]{8,80}$/.test(body.requestId)) throw new BadRequestException('A valid purchase request id is required');
    const backdrops = Object.entries(DEMO_BACKDROP_PALETTE);
    const reward = randomInt(100) < 80 ? backdrops.find(([name]) => name === 'Black')! : backdrops.filter(([name]) => name !== 'Black')[randomInt(backdrops.length - 1)];
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${`orbit-nft-pack:${packId}`}))::text AS locked`;
      const reference = `orbit-nft:${user.id}:${packId}:${body.requestId}`;
      const previous = await tx.gameTransaction.findUnique({ where: { reference } });
      if (previous) {
        const details = previous.details as { giftId?: string } | null;
        if (!details?.giftId) throw new BadRequestException('Purchase record is incomplete');
        const gift = await tx.gift.findUniqueOrThrow({ where: { id: details.giftId } });
        const sold = await tx.gameTransaction.count({ where: { game: 'ORBIT_NFT', type: pack.type } });
        const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
        return { gift, sold, balanceGram: balance.balanceGram.toString() };
      }
      const sold = await tx.gameTransaction.count({ where: { game: 'ORBIT_NFT', type: pack.type } });
      if (sold >= 500) throw new BadRequestException('This pack is sold out');
      const debit = await tx.user.updateMany({ where: { id: user.id, balanceGram: { gte: pack.price } }, data: { balanceGram: { decrement: pack.price } } });
      if (debit.count !== 1) throw new BadRequestException('Insufficient ORBIT balance');
      const gift = await tx.gift.create({ data: {
        name: reward[0], emoji: packId, collection: DEMO_BACKDROP_COLLECTION, priceTon: pack.price,
        backdropName: reward[0], backdropColor: reward[1], status: 'OWNED', ownerId: user.id,
      } });
      await tx.gameTransaction.create({ data: {
        userId: user.id, game: 'ORBIT_NFT', type: pack.type,
        reference,
        amountGram: `-${pack.price}`, details: { packId, giftId: gift.id, backdrop: reward[0] },
      } });
      const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
      return { gift, sold: sold + 1, balanceGram: balance.balanceGram.toString() };
    });
    return {
      item: { id: result.gift.id, name: result.gift.backdropName, color: result.gift.backdropColor, emoji: '', packId, priceTon: result.gift.priceTon.toString(), obtainedAt: result.gift.createdAt.getTime() },
      supply: { limit: 500, sold: result.sold, remaining: 500 - result.sold },
      balanceGram: result.balanceGram,
    };
  }

  @Post('demo/backdrops/drop')
  async createDemoBackdropDrop(@Body() body: { initData?: string; name: string; packId?: string }) {
    throw new BadRequestException('Use the paid ORBIT NFT pack purchase flow');
  }

  @Post('demo/backdrops/transfer')
  async transferDemoBackdrop(@Body() body: { initData?: string; itemId: string; recipientUsername: string }) {
    const sender = await this.getOrCreateTelegramUser(body.initData);
    if (!body.itemId) throw new BadRequestException('Backdrop id is required');
    const username = body.recipientUsername?.trim().replace(/^@/, '');
    if (!username || !/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(username)) throw new BadRequestException('Enter a valid Telegram username');
    const recipient = await this.prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: { id: true },
    });
    if (!recipient) throw new NotFoundException('That user must open ORBIT before you can transfer a demo backdrop');
    if (recipient.id === sender.id) throw new BadRequestException('You cannot transfer a backdrop to yourself');
    const updated = await this.prisma.gift.updateMany({
      where: { id: body.itemId, ownerId: sender.id, status: 'OWNED', collection: DEMO_BACKDROP_COLLECTION },
      data: { ownerId: recipient.id },
    });
    if (updated.count !== 1) throw new BadRequestException('This demo backdrop is no longer available to transfer');
    return { transferred: true };
  }

  @Post('demo/backdrops/sell')
  async sellDemoBackdrop(@Body() body: { initData?: string; itemId: string }) {
    const user = await this.getOrCreateTelegramUser(body.initData);
    if (!body.itemId) throw new BadRequestException('Backdrop id is required');
    const deleted = await this.prisma.gift.deleteMany({
      where: { id: body.itemId, ownerId: user.id, status: 'OWNED', collection: DEMO_BACKDROP_COLLECTION },
    });
    if (deleted.count !== 1) throw new BadRequestException('This demo backdrop is no longer available to sell');
    return { sold: true, creditedTon: '0' };
  }

  @Get('gifts/listed')
  async getListedGifts(@Query('initData') initData: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const telegramUser = this.telegramAuth.validateInitData(initData);
    const user = await this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: { username: telegramUser.username ?? null },
      create: {
        telegramId: String(telegramUser.id),
        username: telegramUser.username ?? null,
      },
    });

    return this.prisma.gift.findMany({
      where: { ownerId: user.id, status: { in: ['LISTED', 'RESERVED'] } },
      orderBy: { updatedAt: 'desc' },
    });
  }

  
@Post('transactions')
async createTransaction(
  @Body()
  body: {
    type: string;
    amountTon: string;
    giftId?: string;
    initData?: string;
  },
) {
  if (!body.initData) {
    throw new UnauthorizedException('initData is required');
  }

  const telegramUser = this.telegramAuth.validateInitData(
    body.initData,
  );

  const user = await this.prisma.user.upsert({
    where: {
      telegramId: String(telegramUser.id),
    },
    update: {
      username: telegramUser.username ?? null,
    },
    create: {
      telegramId: String(telegramUser.id),
      username: telegramUser.username ?? null,
    },
  });

  if (!body.giftId) {
    throw new Error('giftId is required');
  }

  const gift = await this.prisma.gift.findUnique({
    where: {
      id: body.giftId,
    },
  });

  if (!gift) {
    throw new Error('Gift not found');
  }

  if (gift.status !== 'LISTED') {
    throw new Error('Gift is not available for purchase');
  }

  if (gift.ownerId) {
    throw new Error('Gift already has an owner');
  }

  const transaction = await this.prisma.$transaction(async (tx) => {
    const createdTransaction = await tx.transaction.create({
      data: {
        type: body.type,
        amountTon: body.amountTon,
        giftId: gift.id,
        buyerId: user.id,
        status: 'COMPLETED',
      },
    });

    await tx.gift.update({
      where: {
        id: gift.id,
      },
      data: {
        ownerId: user.id,
        status: 'OWNED',
      },
    });

    return createdTransaction;
  });

  return transaction;
}
  @Get('offers')
async getOffers(@Query('initData') initData: string) {
  if (!initData) {
    throw new UnauthorizedException('initData is required');
  }

  const telegramUser = this.telegramAuth.validateInitData(initData);
  const user = await this.prisma.user.upsert({
    where: { telegramId: String(telegramUser.id) },
    update: { username: telegramUser.username ?? null },
    create: {
      telegramId: String(telegramUser.id),
      username: telegramUser.username ?? null,
    },
  });

  return this.prisma.offer.findMany({
    where: {
      buyerId: user.id,
    },
    include: {
      gift: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
  @Get('offers/incoming')
  async getIncomingOffers(@Query('initData') initData: string) {
    if (!initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(initData);

    const user = await this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: { username: telegramUser.username ?? null },
      create: {
        telegramId: String(telegramUser.id),
        username: telegramUser.username ?? null,
      },
    });

    return this.prisma.offer.findMany({
      where: {
        gift: {
          ownerId: user.id,
        },
      },
      include: {
        gift: true,
        buyer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get('profile/history')
  async getProfileHistory(@Query('initData') initData: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const telegramUser = this.telegramAuth.validateInitData(initData);
    const user = await this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: { username: telegramUser.username ?? null },
      create: {
        telegramId: String(telegramUser.id),
        username: telegramUser.username ?? null,
      },
    });

    const [transactions, offers, deposits, withdrawals, gameTransactions] = await Promise.all([
      this.prisma.transaction.findMany({
        where: {
          type: { not: 'OFFER_ACCEPTED' },
          OR: [{ buyerId: user.id }, { sellerId: user.id }],
        },
        include: { gift: true },
      }),
      this.prisma.offer.findMany({
        where: {
          status: { in: ['ACCEPTED', 'CANCELLED', 'REJECTED'] },
          OR: [
            { buyerId: user.id },
            { sellerId: user.id },
            { gift: { ownerId: user.id } },
          ],
        },
        include: { gift: true },
      }),
      this.prisma.botDeposit.findMany({
        where: { userId: user.id, status: 'CONFIRMED' },
        orderBy: { confirmedAt: 'desc' },
      }),
      this.prisma.botWithdrawal.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.gameTransaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ]);

    return [
      ...transactions.map((transaction) => ({
        id: `transaction:${transaction.id}`,
        kind: 'TRANSACTION' as const,
        event: transaction.type,
        status: transaction.status,
        amountTon: transaction.amountTon,
        gift: transaction.gift,
        createdAt: transaction.createdAt,
      })),
      ...offers.map((offer) => ({
        id: `offer:${offer.id}`,
        kind: 'OFFER' as const,
        event: offer.status,
        status: offer.status,
        amountTon: offer.amountTon,
        gift: offer.gift,
        createdAt: offer.updatedAt,
      })),
      ...deposits.map((deposit) => ({
        id: `deposit:${deposit.id}`,
        kind: 'BALANCE' as const,
        event: 'DEPOSIT',
        status: deposit.status,
        amountTon: deposit.receivedTon,
        txHash: deposit.txHash,
        createdAt: deposit.confirmedAt ?? deposit.createdAt,
      })),
      ...withdrawals.map((withdrawal) => ({
        id: `withdrawal:${withdrawal.id}`,
        kind: 'BALANCE' as const,
        event: 'WITHDRAWAL',
        status: withdrawal.status,
        amountTon: withdrawal.amountTon,
        txHash: withdrawal.txHash,
        createdAt: withdrawal.confirmedAt ?? withdrawal.updatedAt,
      })),
      ...gameTransactions.map((transaction) => ({
        id: `game:${transaction.id}`,
        kind: 'BALANCE' as const,
        event: `${transaction.game}_${transaction.type}`,
        status: 'COMPLETED',
        amountTon: transaction.amountGram,
        createdAt: transaction.createdAt,
      })),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Post('offers')
  async createOffer(
    @Body()
    body: {
      amountTon: string;
      giftId: string;
      sellerId?: string;
      expiresAt?: string;
      initData?: string;
    },
  ) {
    if (!body.giftId) throw new BadRequestException('Gift id is required');
    if (!body.amountTon || !/^\d{1,11}(\.\d{1,9})?$/.test(body.amountTon) || Number(body.amountTon) <= 0) {
      throw new BadRequestException('Offer amount must be greater than zero and have up to 9 decimal places');
    }
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(
      body.initData,
    );

    const user = await this.prisma.user.upsert({
      where: {
        telegramId: String(telegramUser.id),
      },
      update: {
        username: telegramUser.username ?? null,
      },
      create: {
        telegramId: String(telegramUser.id),
        username: telegramUser.username ?? null,
      },
    });

    const gift = await this.prisma.gift.findUnique({ where: { id: body.giftId } });
    if (!gift) throw new NotFoundException('Gift not found');
    if (gift.status !== 'LISTED') throw new BadRequestException('Offers are available only for listed gifts');
    if (gift.ownerId === user.id) throw new BadRequestException('You cannot make an offer on your own gift');

    return this.prisma.offer.create({
      data: {
        amountTon: body.amountTon,
        giftId: body.giftId,
        buyerId: user.id,
        sellerId: gift.ownerId,
        expiresAt: body.expiresAt
          ? new Date(body.expiresAt)
          : undefined,
        status: 'PENDING',
      },
    });
  }

  @Post('offers/cancel')
  async cancelOffer(
    @Body()
    body: {
      offerId: string;
      initData?: string;
    },
  ) {
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(
      body.initData,
    );

    const user = await this.prisma.user.findUnique({
      where: {
        telegramId: String(telegramUser.id),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Telegram user is not registered');
    }

    const offer = await this.prisma.offer.findUnique({
      where: {
        id: body.offerId,
      },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.buyerId !== user.id) {
      throw new UnauthorizedException(
        'You can only cancel your own offers',
      );
    }

    if (offer.status !== 'PENDING') {
      throw new BadRequestException('Only pending offers can be cancelled');
    }

    return this.prisma.offer.update({
      where: {
        id: body.offerId,
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  @Post('offers/accept')
  async acceptOffer(
    @Body()
    body: {
      offerId: string;
      initData?: string;
    },
  ) {
    if (!body.initData) {
      throw new UnauthorizedException('initData is required');
    }

    const telegramUser = this.telegramAuth.validateInitData(
      body.initData,
    );

    const user = await this.prisma.user.findUnique({
      where: {
        telegramId: String(telegramUser.id),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Telegram user is not registered');
    }

    const offer = await this.prisma.offer.findUnique({
      where: {
        id: body.offerId,
      },
      include: {
        gift: true,
      },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.status !== 'PENDING') {
      throw new BadRequestException('Only pending offers can be accepted');
    }

    if (offer.gift.ownerId !== user.id) {
      throw new UnauthorizedException(
        'You can only accept offers for your own gifts',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const reserved = await tx.gift.updateMany({
        where: { id: offer.giftId, ownerId: user.id, status: 'LISTED' },
        data: { status: 'RESERVED' },
      });
      if (reserved.count !== 1) {
        throw new BadRequestException('This gift is no longer available');
      }

      const accepted = await tx.offer.updateMany({
        where: { id: offer.id, status: 'PENDING' },
        data: { status: 'ACCEPTED', sellerId: user.id },
      });
      if (accepted.count !== 1) {
        throw new BadRequestException('This offer is no longer pending');
      }

      await tx.offer.updateMany({
        where: { giftId: offer.giftId, id: { not: offer.id }, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      });
      return tx.offer.findUnique({
        where: { id: offer.id },
        include: { gift: true },
      });
    });
  }

  @Post('offers/reject')
  async rejectOffer(
    @Body() body: { offerId: string; initData?: string },
  ) {
    if (!body.offerId) throw new BadRequestException('Offer id is required');
    if (!body.initData) throw new UnauthorizedException('initData is required');

    const telegramUser = this.telegramAuth.validateInitData(body.initData);
    const user = await this.prisma.user.findUnique({
      where: { telegramId: String(telegramUser.id) },
    });
    if (!user) throw new UnauthorizedException('Telegram user is not registered');

    const offer = await this.prisma.offer.findUnique({
      where: { id: body.offerId },
      include: { gift: true },
    });
    if (!offer) throw new NotFoundException('Offer not found');
    if (offer.gift.ownerId !== user.id) {
      throw new UnauthorizedException('You can only reject offers for your own gifts');
    }
    if (offer.status !== 'PENDING') {
      throw new BadRequestException('Only pending offers can be rejected');
    }

    const updated = await this.prisma.offer.updateMany({
      where: { id: offer.id, status: 'PENDING' },
      data: { status: 'REJECTED' },
    });
    if (updated.count !== 1) throw new BadRequestException('This offer is no longer pending');
    return this.prisma.offer.findUnique({
      where: { id: offer.id },
      include: { gift: true, buyer: true },
    });
  }

  @Post('offers/release-accepted')
  async releaseAcceptedOffer(
    @Body() body: { offerId: string; initData?: string },
  ) {
    if (!body.offerId) throw new BadRequestException('Offer id is required');
    if (!body.initData) throw new UnauthorizedException('initData is required');

    const telegramUser = this.telegramAuth.validateInitData(body.initData);
    const user = await this.prisma.user.findUnique({
      where: { telegramId: String(telegramUser.id) },
    });
    if (!user) throw new UnauthorizedException('Telegram user is not registered');

    const offer = await this.prisma.offer.findUnique({
      where: { id: body.offerId },
      include: { gift: true },
    });
    if (!offer) throw new NotFoundException('Offer not found');
    if (offer.sellerId !== user.id || offer.gift.ownerId !== user.id) {
      throw new UnauthorizedException('Only the seller can release this accepted offer');
    }
    if (offer.status !== 'ACCEPTED') {
      throw new BadRequestException('Only accepted offers can be released');
    }

    return this.prisma.$transaction(async (tx) => {
      const reopened = await tx.gift.updateMany({
        where: { id: offer.giftId, ownerId: user.id, status: 'RESERVED' },
        data: { status: 'LISTED' },
      });
      if (reopened.count !== 1) {
        throw new BadRequestException('This gift is no longer reserved');
      }

      const cancelled = await tx.offer.updateMany({
        where: { id: offer.id, sellerId: user.id, status: 'ACCEPTED' },
        data: { status: 'CANCELLED' },
      });
      if (cancelled.count !== 1) {
        throw new BadRequestException('This accepted offer has already changed');
      }

      return tx.offer.findUnique({
        where: { id: offer.id },
        include: { gift: true },
      });
    });
  }

  @Post('gifts/sell')
  async sellGift(
  @Body()
  body: {
    giftId: string;
    priceTon: string;
    initData?: string;
  },
) {
  if (!body.giftId) {
    throw new BadRequestException('Gift id is required');
  }
  if (!body.priceTon || !/^\d{1,11}(\.\d{1,9})?$/.test(body.priceTon)) {
    throw new BadRequestException('Enter a valid price with up to 9 decimal places');
  }
  if (Number(body.priceTon) <= 0) {
    throw new BadRequestException('Price must be greater than zero');
  }
  if (!body.initData) {
    throw new UnauthorizedException('initData is required');
  }

  const telegramUser = this.telegramAuth.validateInitData(
    body.initData,
  );

  const user = await this.prisma.user.findUnique({
    where: {
      telegramId: String(telegramUser.id),
    },
  });

  if (!user) {
    throw new UnauthorizedException(
      'Telegram user is not registered',
    );
  }

  const gift = await this.prisma.gift.findUnique({
    where: {
      id: body.giftId,
    },
  });

  if (!gift) {
    throw new NotFoundException('Gift not found');
  }

  if (gift.ownerId !== user.id) {
    throw new UnauthorizedException(
      'You can only sell your own gifts',
    );
  }

  if (gift.status !== 'OWNED' && gift.status !== 'LISTED') {
    throw new BadRequestException(`Gift cannot be listed from status ${gift.status}`);
  }

  return this.prisma.gift.update({
    where: {
      id: gift.id,
    },
    data: {
      priceTon: body.priceTon,
      status: 'LISTED',
    },
  });
}

  @Post('gifts/unlist')
  async unlistGift(@Body() body: { giftId: string; initData?: string }) {
    if (!body.giftId) throw new BadRequestException('Gift id is required');
    if (!body.initData) throw new UnauthorizedException('initData is required');
    const telegramUser = this.telegramAuth.validateInitData(body.initData);
    const user = await this.prisma.user.findUnique({
      where: { telegramId: String(telegramUser.id) },
    });
    if (!user) throw new UnauthorizedException('Telegram user is not registered');

    const gift = await this.prisma.gift.findUnique({ where: { id: body.giftId } });
    if (!gift) throw new NotFoundException('Gift not found');
    if (gift.ownerId !== user.id) {
      throw new UnauthorizedException('You can only edit your own listings');
    }
    if (gift.status !== 'LISTED') throw new BadRequestException('Gift is not listed');

    return this.prisma.$transaction(async (tx) => {
      const changed = await tx.gift.updateMany({
        where: { id: gift.id, ownerId: user.id, status: 'LISTED' },
        data: { status: 'OWNED' },
      });
      if (changed.count !== 1) throw new BadRequestException('Gift is no longer listed');
      await tx.offer.updateMany({
        where: { giftId: gift.id, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      });
      return tx.gift.findUnique({ where: { id: gift.id } });
    });
  }

  private async getOrCreateTelegramUser(initData?: string) {
    if (!initData) throw new UnauthorizedException('initData is required');
    const telegramUser = this.telegramAuth.validateInitData(initData);
    return this.prisma.user.upsert({
      where: { telegramId: String(telegramUser.id) },
      update: { username: telegramUser.username ?? null },
      create: { telegramId: String(telegramUser.id), username: telegramUser.username ?? null },
    });
  }

  private async listDemoBackdrops(userId: string) {
    const items = await this.prisma.gift.findMany({
      where: { ownerId: userId, status: 'OWNED', collection: DEMO_BACKDROP_COLLECTION },
      select: { id: true, name: true, emoji: true, backdropName: true, backdropColor: true, priceTon: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => ({
      id: item.id,
      name: item.backdropName ?? item.name,
      color: item.backdropColor ?? DEMO_BACKDROP_PALETTE[item.name] ?? '#17191d',
      emoji: '',
      packId: item.emoji === 'orbit-dog' ? 'orbit-dog' : 'sweeties',
      priceTon: item.priceTon.toString(),
      obtainedAt: item.createdAt.getTime(),
    }));
  }
}
