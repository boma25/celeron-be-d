import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './Dto/createTransaction.dto';
import { UserService } from 'src/user/user.service';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { ETransactionStatus, Transaction } from '@prisma/client';
import { TPaystackTransaction } from 'src/@types/paystack.types';

@Injectable()
export class TransactionsService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  async create(
    userId: string,
    payload: CreateTransactionDto,
  ): Promise<{ reference: string }> {
    const user = await this.userService.findUser({ id: userId });
    if (!user) throw new Error('invalid user');

    const refExists = await this.prismaService.transaction.findFirst({
      where: {
        userId,
        status: ETransactionStatus.PENDING,
        amount: payload.amount,
      },
    });
    if (refExists) return { reference: refExists.reference };
    const reference = await this.generateReference();
    await this.prismaService.transaction.create({
      data: {
        ...payload,
        reference,
        userId,
        description: 'Checkout',
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
    await this.prismaService.transaction.update({
      where: { id: transaction.id },
      data: {
        status:
          status === 'success'
            ? ETransactionStatus.SUCCESSFUL
            : ETransactionStatus.FAILED,
      },
    });
  }
}
