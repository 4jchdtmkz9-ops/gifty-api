import 'dotenv/config';
import { PrismaClient } from '../dist/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const sampleGifts = [
    { name: 'Diamond Ring', collection: 'Telegram Gifts' },
    { name: 'Astral Shard', collection: 'Limited Gifts' },
    { name: 'Golden Bear', collection: 'Rare Gifts' },
    { name: 'Crystal Heart', collection: 'Premium Gifts' },
  ];

  // Keep old preview records in the database as drafts, but never publish them as marketplace stock.
  for (const gift of sampleGifts) {
    await prisma.gift.updateMany({
      where: {
        ...gift,
        ownerId: null,
        telegramOwnedGiftId: null,
        status: 'LISTED',
      },
      data: { status: 'DRAFT' },
    });
  }

  console.log('ORBIT seed completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
