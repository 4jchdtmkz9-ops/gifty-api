import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { TonService } from './ton.service.js';
import { PrismaService } from './prisma.service.js';
import { TelegramAuthService } from './auth/telegram-auth.service.js';

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
      where: { status: 'LISTED' },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  @Get('market/nfts')
  async getMarketplaceNfts(
    @Query('search') search = '',
    @Query('offset') offset = '0',
  ) {
    const token = process.env.PORTALS_PARTNER_TOKEN;
    if (!token) {
      throw new ServiceUnavailableException(
        'The Portals marketplace API token is not configured',
      );
    }

    const parsedOffset = Number.parseInt(offset, 10);
    const params = new URLSearchParams({
      status: 'listed',
      sort_by: 'listed_at desc',
      limit: '50',
      offset: String(Number.isFinite(parsedOffset) ? Math.max(0, parsedOffset) : 0),
      with_attributes: 'true',
    });
    const query = search.trim();
    if (query) params.set('search', query.slice(0, 100));

    const response = await fetch(
      `https://portal-market.com/partners/nfts/search?${params.toString()}`,
      {
        headers: { Authorization: `partners ${token}` },
        signal: AbortSignal.timeout(12_000),
      },
    );

    if (!response.ok) {
      throw new ServiceUnavailableException(
        response.status === 401
          ? 'The Portals marketplace API token is invalid'
          : 'The Portals marketplace is temporarily unavailable',
      );
    }

    const payload = (await response.json()) as {
      results?: unknown[] | null;
      total_count?: number | null;
    };
    return {
      items: payload.results ?? [],
      totalCount: payload.total_count ?? 0,
    };
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
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
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

    const [transactions, offers] = await Promise.all([
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
}
