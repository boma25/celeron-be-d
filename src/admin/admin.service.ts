import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Admin, Prisma } from '@prisma/client';
import { TSerializedUser } from 'src/@types/app.types';
import { EEmailEvents } from 'src/@types/enums';
import { PrismaService } from 'src/prisma.service';
import { newAdminAddedEmailEvent } from 'src/utils/events';
import { authHelpers } from 'src/utils/helpers/auth.helpers';
import { ChangePasswordDto } from './Dto/changePasswordDto';

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAdmin(
    adminWhereUniqueInput: Prisma.AdminWhereUniqueInput,
  ): Promise<Admin | null> {
    return this.prismaService.admin.findUnique({
      where: adminWhereUniqueInput,
    });
  }

  async findAdminById(id: string): Promise<TSerializedUser> {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        adminType: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) throw new BadRequestException('invalid admin id');

    return admin;
  }

  async findAllAdmins(adminId: string): Promise<TSerializedUser[]> {
    return this.prismaService.admin.findMany({
      where: { id: { not: adminId } },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        adminType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async addAdmin(
    payload: Omit<Prisma.AdminCreateInput, 'password'>,
  ): Promise<TSerializedUser | null> {
    const adminExist = await this.findAdmin({ email: payload.email });
    if (adminExist)
      throw new BadRequestException('an admin with this email already exist');
    const { password, passwordText } =
      await authHelpers.generateAdminPassword();

    const newAdmin = await this.prismaService.admin.create({
      data: { ...payload, password },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        adminType: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    this.eventEmitter.emit(
      EEmailEvents.ADMIN_ADDED,
      new newAdminAddedEmailEvent(
        payload.email,
        payload.firstName,
        passwordText,
      ),
    );

    return newAdmin;
  }

  async deleteAdmin(id: string): Promise<void> {
    const adminExist = await this.findAdmin({ id });
    if (!adminExist) throw new BadRequestException('invalid admin id');
    await this.prismaService.admin.delete({ where: { id } });
  }

  async updateProfile(id: string, data: Prisma.AdminUpdateInput) {
    return await this.prismaService.admin.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        adminType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    const admin = await this.findAdmin({ id });
    if (
      !(await authHelpers.verifyPassword(data.currentPassword, admin.password))
    )
      throw new BadRequestException('invalid password');

    if (await authHelpers.verifyPassword(data.password, admin.password))
      throw new BadRequestException(
        'old password cannot be the same as the new password',
      );

    const password = await authHelpers.hashPassword(data.password);
    await this.updateProfile(id, { password });
  }
}
