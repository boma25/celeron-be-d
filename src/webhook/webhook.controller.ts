import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { TApiResponse } from 'src/@types/app.types';
import { Public } from 'src/auth/decorators/public.decorators';
import { PaystackWebhookGuard } from 'src/auth/guards/webhook.gurad';
import { TPaystackWebhookBody } from 'src/@types/paystack.types';

@Public()
@UseGuards(PaystackWebhookGuard)
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/verify-transaction')
  async verifyTransaction(@Body() body: TPaystackWebhookBody): TApiResponse {
    await this.webhookService.verifyTransaction(body);
    return { message: 'transaction successful' };
  }
}
