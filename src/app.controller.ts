import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UnauthorizedException,
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

  return this.prisma.gift.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
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

    return this.prisma.offer.create({
      data: {
        amountTon: body.amountTon,
        giftId: body.giftId,
        buyerId: user.id,
        sellerId: body.sellerId,
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
      throw new Error('Offer not found');
    }

    if (offer.buyerId !== user.id) {
      throw new UnauthorizedException(
        'You can only cancel your own offers',
      );
    }

    if (offer.status !== 'PENDING') {
      throw new Error('Only pending offers can be cancelled');
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
      throw new Error('Offer not found');
    }

    if (offer.status !== 'PENDING') {
      throw new Error('Only pending offers can be accepted');
    }

    if (!offer.gift.ownerId) {
      throw new Error('This gift has no owner');
    }

    if (offer.gift.ownerId !== user.id) {
      throw new UnauthorizedException(
        'You can only accept offers for your own gifts',
      );
    }

    return this.prisma.offer.update({
      where: {
        id: body.offerId,
      },
      data: {
        status: 'ACCEPTED',
        sellerId: user.id,
      },
    });
  }
}