import { BadRequestException, Injectable } from '@nestjs/common';
import { ERole, Order, Prisma } from '@prisma/client';
import { TServerResponse } from 'src/@types/app.types';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderDto } from './Dto/updateOrder.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(
    data: Omit<Prisma.OrderCreateInput, 'orderNumber'>,
  ): Promise<Order> {
    const orderNumber = await this.generateOrderNumber();
    return await this.prismaService.order.create({
      data: { ...data, orderNumber },
    });
  }

  async getOrderById(id: string, userId: string, role: ERole): Promise<Order> {
    const where: Prisma.OrderWhereUniqueInput = { id };
    if (role === ERole.USER) {
      where['userId'] = userId;
    }

    const order = await this.prismaService.order.findUnique({
      where,
      include: {
        shipmentHistory: true,
        deliveryAddress: true,
        transaction: {
          select: {
            Card: { select: { last4: true, card_type: true } },
          },
        },
        products: {
          include: {
            product: {
              select: { price: true, medias: true },
            },
          },
        },
      },
    });

    if (!order) throw new BadRequestException('invalid order id');

    return order;
  }

  async getOrders(
    userId: string,
    role: ERole,
  ): Promise<TServerResponse<Order[]>> {
    const where: Prisma.OrderWhereInput = {};
    if (role === ERole.USER) {
      where['userId'] = userId;
    }

    const data = await this.prismaService.order.findMany({
      where,
      include: {
        products: {
          include: {
            product: {
              select: { price: true, medias: true },
            },
          },
        },
      },
    });
    return { data };
  }

  async updateOrder(
    id: string,
    userId: string,
    role: ERole,
    data: UpdateOrderDto,
  ): Promise<Order> {
    const where: Prisma.OrderWhereUniqueInput = { id };

    await this.getOrderById(id, userId, role);

    if (role === ERole.USER) {
      where['userId'] = userId;
    }

    return await this.prismaService.order.update({
      where,
      data,
      include: { products: true },
    });
  }

  private async generateOrderNumber(): Promise<number> {
    const randBytes = randomBytes(3);
    const orderNumber = parseInt(randBytes.toString('hex'), 16);
    const refExist = await this.prismaService.order.findUnique({
      where: { orderNumber },
    });
    if (refExist) return this.generateOrderNumber();
    return orderNumber;
  }
}
