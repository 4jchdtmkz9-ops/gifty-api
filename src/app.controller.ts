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
import { AppService } from './app.service.js';
import { TonService } from './ton.service.js';
import { PrismaService } from './prisma.service.js';
import { TelegramAuthService } from './auth/telegram-auth.service.js';
import { chooseOrbitNftBackdrop, ORBIT_NFT_COLLECTION, ORBIT_NFT_PALETTE, orbitNftResaleValue } from './orbit-nft.config.js';

const HIDDEN_SAMPLE_GIFTS = [
  { name: 'Diamond Ring', collection: 'Telegram Gifts' },
  { name: 'Astral Shard', collection: 'Limited Gifts' },
  { name: 'Golden Bear', collection: 'Rare Gifts' },
  { name: 'Crystal Heart', collection: 'Premium Gifts' },
];

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
      where: {
        status: 'LISTED',
        ownerId: null,
        NOT: HIDDEN_SAMPLE_GIFTS,
      },
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
      collection: { not: ORBIT_NFT_COLLECTION },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

  @Get('orbit-nft/inventory')
  async getOrbitNftInventory(@Query('initData') initData: string) {
    const user = await this.getOrCreateTelegramUser(initData);
    return this.listOrbitNfts(user.id);
  }

  @Post('orbit-nft/sync')
  async syncOrbitNftInventory(@Body() body: { initData?: string; items?: Array<{ id: string; name: string; packId?: string }> }) {
    const user = await this.getOrCreateTelegramUser(body.initData);
    // Inventory is authoritative on the server; never import client-provided items.
    return this.listOrbitNfts(user.id);
  }

  @Get('orbit-nft/supply')
  async getOrbitNftPackSupply() {
    const packs = [
      { id: 'sweeties', limit: 500 },
      { id: 'orbit-dog', limit: 500 },
      { id: 'durov', limit: 42 },
    ] as const;
    const purchases = await Promise.all(packs.map((pack) => this.prisma.gameTransaction.count({ where: { game: 'ORBIT_NFT', type: `PURCHASE_${pack.id.toUpperCase().replace('-', '_')}` } })));
    return Object.fromEntries(packs.map((pack, index) => [pack.id, { limit: pack.limit, sold: Math.min(pack.limit, purchases[index]), remaining: Math.max(0, pack.limit - purchases[index]) }]));
  }

  @Post('orbit-nft/purchase')
  async purchaseOrbitNftPack(@Body() body: { initData?: string; packId?: string; requestId?: string }) {
    const user = await this.getOrCreateTelegramUser(body.initData);
    const packId = body.packId === 'orbit-dog' || body.packId === 'sweeties' || body.packId === 'durov' ? body.packId : null;
    if (!packId) throw new BadRequestException('Unknown ORBIT NFT pack');
    const pack = packId === 'sweeties'
      ? { price: '0.25', type: 'PURCHASE_SWEETIES', limit: 500 }
      : packId === 'orbit-dog'
        ? { price: '0.35', type: 'PURCHASE_ORBIT_DOG', limit: 500 }
        : { price: '5', type: 'PURCHASE_DUROV', limit: 42 };
    if (!body.requestId || !/^[A-Za-z0-9_-]{8,80}$/.test(body.requestId)) throw new BadRequestException('A valid purchase request id is required');
    const reward = chooseOrbitNftBackdrop();
    const resaleValue = orbitNftResaleValue(reward[0], packId);
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
      if (sold >= pack.limit) throw new BadRequestException('This pack is sold out');
      const debit = await tx.user.updateMany({ where: { id: user.id, balanceGram: { gte: pack.price } }, data: { balanceGram: { decrement: pack.price } } });
      if (debit.count !== 1) throw new BadRequestException('Insufficient ORBIT balance');
      const gift = await tx.gift.create({ data: {
        name: reward[0], emoji: packId, collection: ORBIT_NFT_COLLECTION, priceTon: resaleValue,
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
      supply: { limit: pack.limit, sold: result.sold, remaining: pack.limit - result.sold },
      balanceGram: result.balanceGram,
    };
  }

  @Post('orbit-nft/transfer')
  async transferOrbitNft(@Body() body: { initData?: string; itemId: string; recipientUsername: string }) {
    const sender = await this.getOrCreateTelegramUser(body.initData);
    if (!body.itemId) throw new BadRequestException('Backdrop id is required');
    const username = body.recipientUsername?.trim().replace(/^@/, '');
    if (!username || !/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(username)) throw new BadRequestException('Enter a valid Telegram username');
    const recipient = await this.prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: { id: true },
    });
    if (!recipient) throw new NotFoundException('That user must open ORBIT before you can transfer this collectible');
    if (recipient.id === sender.id) throw new BadRequestException('You cannot transfer a collectible to yourself');
    const updated = await this.prisma.gift.updateMany({
      where: { id: body.itemId, ownerId: sender.id, status: 'OWNED', collection: ORBIT_NFT_COLLECTION },
      data: { ownerId: recipient.id },
    });
    if (updated.count !== 1) throw new BadRequestException('This collectible is no longer available to transfer');
    return { transferred: true };
  }

  @Post('orbit-nft/sell')
  async sellOrbitNft(@Body() body: { initData?: string; itemId: string }) {
    const user = await this.getOrCreateTelegramUser(body.initData);
    if (!body.itemId) throw new BadRequestException('Backdrop id is required');
    const result = await this.prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "Gift" WHERE "id" = ${body.itemId} FOR UPDATE`;
      if (!locked[0]) throw new NotFoundException('Collectible not found');
      const gift = await tx.gift.findFirst({ where: { id: body.itemId, ownerId: user.id, status: 'OWNED', collection: ORBIT_NFT_COLLECTION } });
      if (!gift) throw new BadRequestException('This collectible is no longer available to sell');
      const packId = gift.emoji === 'durov' ? 'durov' : gift.emoji === 'orbit-dog' ? 'orbit-dog' : 'sweeties';
      const amount = orbitNftResaleValue(gift.backdropName ?? gift.name, packId);
      const updated = await tx.gift.updateMany({ where: { id: gift.id, ownerId: user.id, status: 'OWNED' }, data: { ownerId: null, status: 'SOLD' } });
      if (updated.count !== 1) throw new BadRequestException('This collectible is no longer available to sell');
      await tx.user.update({ where: { id: user.id }, data: { balanceGram: { increment: amount } } });
      await tx.gameTransaction.create({ data: {
        userId: user.id, game: 'ORBIT_NFT', type: 'QUICK_SELL', reference: `orbit-nft-sale:${gift.id}`,
        amountGram: amount, details: { giftId: gift.id, name: gift.backdropName ?? gift.name, packId, creditedGram: amount },
      } });
      const balance = await tx.user.findUniqueOrThrow({ where: { id: user.id }, select: { balanceGram: true } });
      return { amount, balanceGram: balance.balanceGram.toString(), name: gift.backdropName ?? gift.name };
    });
    return { sold: true, creditedGram: result.amount, balanceGram: result.balanceGram, name: result.name };
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
      where: { ownerId: user.id, status: { in: ['LISTED', 'RESERVED'] }, NOT: HIDDEN_SAMPLE_GIFTS },
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
      gift: { NOT: HIDDEN_SAMPLE_GIFTS },
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
          NOT: HIDDEN_SAMPLE_GIFTS,
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

    const [transactions, offers, deposits, withdrawals, gameTransactions, nftWins] = await Promise.all([
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
      this.prisma.pvpRoom.findMany({
        where: { winnerId: user.id, status: 'COMPLETED', participants: { some: { gifts: { some: {} } } } },
        select: { id: true, completedAt: true, participants: { select: { gifts: { select: { giftId: true } } } } },
        orderBy: { completedAt: 'desc' },
        take: 50,
      }),
    ]);

    const loggedNftWinRooms = new Set(gameTransactions
      .filter((transaction) => transaction.type === 'NFT_PAYOUT')
      .map((transaction) => transaction.reference));

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
        amountTon: transaction.type === 'NFT_PAYOUT' ? null : transaction.amountGram,
        details: transaction.details,
        createdAt: transaction.createdAt,
      })),
      ...nftWins
        .filter((room) => !loggedNftWinRooms.has(`pvp:${room.id}:nft-payout`))
        .map((room) => ({
          id: `pvp-nft-win:${room.id}`,
          kind: 'BALANCE' as const,
          event: 'PVP_NFT_PAYOUT',
          status: 'COMPLETED',
          amountTon: null,
          details: { nftCount: room.participants.reduce((total, participant) => total + participant.gifts.length, 0) },
          createdAt: room.completedAt ?? new Date(0),
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

  private async listOrbitNfts(userId: string) {
    const items = await this.prisma.gift.findMany({
      where: { ownerId: userId, status: 'OWNED', collection: ORBIT_NFT_COLLECTION },
      select: { id: true, name: true, emoji: true, backdropName: true, backdropColor: true, priceTon: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => {
      const name = item.backdropName ?? item.name;
      const packId = item.emoji === 'durov' ? 'durov' : item.emoji === 'orbit-dog' ? 'orbit-dog' : 'sweeties';
      return {
        id: item.id,
        name,
        color: item.backdropColor ?? ORBIT_NFT_PALETTE[item.name] ?? '#17191d',
        emoji: '',
        packId,
        priceTon: orbitNftResaleValue(name, packId),
        obtainedAt: item.createdAt.getTime(),
      };
    });
  }
}
