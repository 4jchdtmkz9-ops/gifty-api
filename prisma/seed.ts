import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const gifts = [
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
  ];

  for (const gift of gifts) {
    const existing = await prisma.gift.findFirst({
      where: {
        name: gift.name,
        collection: gift.collection,
      },
    });

    if (existing) {
      await prisma.gift.update({
        where: { id: existing.id },
        data: {
          name: gift.name,
          collection: gift.collection,
          emoji: gift.emoji,
          priceTon: gift.priceTon,
        },
      });
    } else {
      await prisma.gift.create({ data: gift });
    }
  }

  console.log('GIFTY seed completed successfully');
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
