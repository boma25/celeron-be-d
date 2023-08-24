import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma, Address } from '@prisma/client';
import { ChangePasswordDto } from './Dto/changePasswordd.dto';
import { authHelpers } from 'src/utils/helpers/auth.helpers';
import { addAddressDto } from './Dto/addAddress.dto';
import { updateAddressDto } from './Dto/updateAddress.dto';

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

  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    const user = await this.findUser({ id });
    if (authHelpers.verifyPassword(data.password, user.password)) {
      throw new BadRequestException(
        'old password cannot be the same as the new password',
      );
    }
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

    return await this.prismaService.address.create({
      data: { ...body, userId },
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
}
