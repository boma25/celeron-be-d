import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      include: { cart: { select: { id: true, products: true, total: true } } },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    const userExist = await this.prismaService.user.findFirst({
      where: {
        OR: [{ phoneNumber: data.phoneNumber }, { email: data.email }],
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
}
