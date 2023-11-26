import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './Dto/createTransaction.dto';
import { UserService } from 'src/user/user.service';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { ETransactionStatus, Transaction } from '@prisma/client';
import { TPaystackTransaction } from 'src/@types/paystack.types';
import { EPaystackChannel } from 'src/@types/enums';

@Injectable()
export class TransactionsService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  async create(
    userId: string,
    { amount, description }: CreateTransactionDto,
  ): Promise<{ reference: string }> {
    const user = await this.userService.findUser({ id: userId });
    if (!user) throw new Error('invalid user');

    const refExists = await this.prismaService.transaction.findFirst({
      where: {
        userId,
        status: ETransactionStatus.PENDING,
        amount: amount,
      },
    });
    if (refExists) return { reference: refExists.reference };
    const reference = await this.generateReference();
    await this.prismaService.transaction.create({
      data: {
        amount,
        reference,
        userId,
        description: description || 'Checkout',
      },
    });

    return { reference };
  }

  async findTransactionByReference(reference: string): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { reference },
    });
    if (!transaction) throw new Error('invalid transaction reference');
    return transaction;
  }

  private async generateReference(): Promise<string> {
    const randBytes = randomBytes(3);
    const randomValue = parseInt(randBytes.toString('hex'), 16);
    const reference = `${randBytes.toString('hex')}${randomValue}`;
    const refExist = await this.prismaService.transaction.findUnique({
      where: { reference },
    });
    if (refExist) return this.generateReference();
    return reference;
  }

  async verifyTransaction(paystackTransaction: TPaystackTransaction) {
    const { reference, status, amount, customer } = paystackTransaction;
    const { email } = customer;

    const transaction = await this.prismaService.transaction.findUnique({
      where: { reference, status: ETransactionStatus.PENDING },
    });
    if (!transaction)
      throw new BadRequestException('invalid transaction reference');
    const user = await this.userService.findUser({
      id: transaction.userId,
      email,
    });
    if (!user) throw new BadRequestException('invalid user');
    if (amount / 100 !== transaction.amount)
      throw new BadRequestException('invalid transaction amount');
    let cardId: string;

    if (paystackTransaction.channel === EPaystackChannel.CARD) {
      const { authorization } = paystackTransaction;
      const card = await this.userService.addCard(user.id, {
        account_name: authorization.account_name || 'TEST_ACCOUNT',
        authorization_code: authorization.authorization_code,
        bin: authorization.bin,
        last4: authorization.last4,
        exp_month: authorization.exp_month,
        exp_year: authorization.exp_year,
        card_type: authorization.card_type,
        bank: authorization.bank,
        country_code: authorization.country_code,
        brand: authorization.brand,
      });
      cardId = card.id;
    }
    await this.prismaService.transaction.update({
      where: { id: transaction.id },
      data: {
        cardId,
        status:
          status === 'success'
            ? ETransactionStatus.SUCCESSFUL
            : ETransactionStatus.FAILED,
      },
    });
  }
}
