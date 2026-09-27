import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.gift.createMany({
    data: [
      {
        name: 'Diamond Ring',
        collection: 'Telegram Gifts',
        emoji: '💎',
        priceTon: '24.5',
        status: 'LISTED',
      },
      {
        name: 'Astral Shard',
        collection: 'Limited Gifts',
        emoji: '🔮',
        priceTon: '18.2',
        status: 'LISTED',
      },
      {
        name: 'Golden Bear',
        collection: 'Rare Gifts',
        emoji: '🐻',
        priceTon: '42',
        status: 'LISTED',
      },
      {
        name: 'Crystal Heart',
        collection: 'Premium Gifts',
        emoji: '💜',
        priceTon: '31.8',
        status: 'LISTED',
      },
    ],
  });
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