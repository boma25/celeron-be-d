import { Body, Controller, Post, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { Public } from 'src/auth/decorators/public.decorators';

@Public()
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/verify-transaction')
  async verifyTransaction(
    @Body() body: any,
    @Req() req: IAppRequest,
  ): TApiResponse {
    console.log({
      body,
      headers: req?.headers,
    });
    return { message: 'transaction successful' };
  }
}
