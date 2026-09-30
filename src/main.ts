import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://gifty-web-iota.vercel.app',
    ],
    allowedHeaders: ['Content-Type', 'X-Telegram-Init-Data'],
  });

  await app.listen(process.env.PORT ?? 3001);
}

await bootstrap();
