import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './Dto/createTransaction.dto';
import { UserService } from 'src/user/user.service';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { Transaction } from '@prisma/client';

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
}
