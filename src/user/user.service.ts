import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma, Address, Card } from '@prisma/client';
import { ChangePasswordDto } from './Dto/changePasswordd.dto';
import { authHelpers } from 'src/utils/helpers/auth.helpers';
import { addAddressDto } from './Dto/addAddress.dto';
import { updateAddressDto } from './Dto/updateAddress.dto';
import { TPaystackAuthorization } from 'src/@types/paystack.types';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUser(UserWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: UserWhereInput,
      include: { cart: { select: { id: true, products: true, total: true } } },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    const userExist = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
      },
    });
    if (userExist)
      throw new BadRequestException(
        'a user with this email or phone number already exist',
      );

    return await this.prismaService.user.create({
      data: { ...data, cart: { create: {} } },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    const user = await this.findUser({ id });

    if (
      !(await authHelpers.verifyPassword(data.currentPassword, user.password))
    )
      throw new BadRequestException('invalid password');

    if (await authHelpers.verifyPassword(data.password, user.password))
      throw new BadRequestException(
        'old password cannot be the same as the new password',
      );

    const password = await authHelpers.hashPassword(data.password);
    await this.updateUser({ where: { id }, data: { password } });
  }

  async findAddresses(userId: string): Promise<Address[]> {
    return await this.prismaService.address.findMany({
      where: { userId },
    });
  }

  async findAddressById(id: string, userId: string): Promise<Address> {
    return await this.prismaService.address.findUnique({
      where: { id, userId },
    });
  }

  async addAddress(userId: string, body: addAddressDto): Promise<Address> {
    body.address = body.address.toLowerCase();
    const addressExist = await this.prismaService.address.findUnique({
      where: { address: body.address },
    });
    if (addressExist) throw new BadRequestException('address already exist');
    const addressCount = await this.prismaService.address.count({
      where: { userId },
    });
    return await this.prismaService.address.create({
      data: { ...body, userId, default: addressCount === 0 },
    });
  }

  async updateAddress(id: string, body: updateAddressDto): Promise<Address> {
    if (body.address) {
      body.address = body.address.toLowerCase();
      const addressExist = await this.prismaService.address.findUnique({
        where: { address: body.address },
      });
      if (addressExist && addressExist.id !== id)
        throw new BadRequestException('address already exist');
    }

    const addressExist = await this.prismaService.address.findUnique({
      where: { id },
    });
    if (addressExist && addressExist.id !== id)
      throw new BadRequestException('invalid address id');

    return await this.prismaService.address.update({
      where: { id },
      data: body,
    });
  }

  async setDefaultAddress(id: string, userId: string): Promise<void> {
    const addressExist = await this.prismaService.address.findUnique({
      where: { id },
    });
    if (!addressExist) throw new BadRequestException('invalid address id');

    await this.prismaService.address.updateMany({
      where: { userId },
      data: { default: false },
    });

    await this.prismaService.address.update({
      where: { id },
      data: { default: true },
    });
  }

  async cards(userId: string): Promise<Card[]> {
    return await this.prismaService.card.findMany({
      where: { userId },
    });
  }

  async addCard(userId: string, card: TPaystackAuthorization) {
    const cardExist = await this.prismaService.card.findFirst({
      where: { ...card, userId },
    });
    if (cardExist) return;
    const cards = await this.cards(userId);
    return await this.prismaService.card.create({
      data: { ...card, userId, default: cards.length === 0 },
    });
  }

  async setDefaultCard(id: string, userId: string): Promise<void> {
    const cardExist = await this.prismaService.card.findUnique({
      where: { id, userId },
    });
    if (!cardExist) throw new BadRequestException('invalid card id');

    await this.prismaService.card.updateMany({
      where: { userId, default: true },
      data: { default: false },
    });

    await this.prismaService.card.update({
      where: { id },
      data: { default: true },
    });
  }

  async deleteCard(id: string, userId: string): Promise<void> {
    const cardExist = await this.prismaService.card.findUnique({
      where: { id, userId },
    });
    if (!cardExist) throw new BadRequestException('invalid card id');

    await this.prismaService.card.delete({ where: { id } });
    if (cardExist.default) {
      const cards = await this.cards(userId);
      if (cards.length > 0) await this.setDefaultCard(cards[0].id, userId);
    }
  }
}
