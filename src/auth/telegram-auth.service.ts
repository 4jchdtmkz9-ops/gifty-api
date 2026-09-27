import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class TelegramAuthService {
  constructor(private readonly config: ConfigService) {}

  isConfigured(): boolean {
    return Boolean(this.config.get<string>('TELEGRAM_BOT_TOKEN'));
  }

  validateInitData(initData: string) {
    const botToken = this.config.get<string>('TELEGRAM_BOT_TOKEN');

    if (!botToken) {
      throw new UnauthorizedException('Telegram bot token is not configured');
    }

    const params = new URLSearchParams(initData);
    const receivedHash = params.get('hash');

    if (!receivedHash) {
      throw new UnauthorizedException('Telegram hash is missing');
    }

    params.delete('hash');

    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const calculatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== receivedHash) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }

    const userJson = params.get('user');

    if (!userJson) {
      throw new UnauthorizedException('Telegram user is missing');
    }

    return JSON.parse(userJson);
  }
}