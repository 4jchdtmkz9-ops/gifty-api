import { Controller, Get } from '@nestjs/common';
import { TelegramRelayService } from './telegram-relay.service.js';

@Controller('telegram')
export class TelegramRelayController {
  constructor(private readonly relay: TelegramRelayService) {}

  @Get('relay-status')
  status() { return this.relay.status(); }

}
