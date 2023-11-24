import { Injectable } from '@nestjs/common';
import { EPaystackEvents } from 'src/@types/enums';
import { TPaystackWebhookBody } from 'src/@types/paystack.types';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class WebhookService {
  constructor(private transactionService: TransactionsService) {}

  async verifyTransaction({
    data,
    event,
  }: TPaystackWebhookBody): Promise<void> {
    if (event !== EPaystackEvents.CHARGE_SUCCESS) return console.log(event);
    await this.transactionService.verifyTransaction(data);
  }
}
