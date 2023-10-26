import { Body, Controller, Post, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { CreateTransactionDto } from './Dto/createTransaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/create')
  async create(
    @Req() req: IAppRequest,
    @Body() body: CreateTransactionDto,
  ): TApiResponse<{ reference: string }> {
    const data = await this.transactionsService.create(req['userId'], body);
    return { data, message: 'transaction created' };
  }
}
