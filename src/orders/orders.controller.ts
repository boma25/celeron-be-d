import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { EOrderStatus, Order } from '@prisma/client';
import { UpdateOrderDto } from './Dto/updateOrder.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ERole } from 'src/@types/enums';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles([ERole.ADMIN, ERole.USER])
  async getOrders(@Req() req: IAppRequest): TApiResponse<Order[]> {
    const response = await this.ordersService.getOrders(
      req['userId'],
      req['role'],
    );
    return { ...response, message: 'orders fetched' };
  }

  @Get(':id')
  @Roles([ERole.ADMIN, ERole.USER])
  async getOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: IAppRequest,
  ): TApiResponse<Order> {
    const data = await this.ordersService.getOrderById(
      id,
      req['userId'],
      req['role'],
    );
    return { data, message: 'order fetched' };
  }

  @Put('cancel/:id')
  async cancelOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: IAppRequest,
  ): TApiResponse<Order> {
    const data = await this.ordersService.updateOrder(
      id,
      req['userId'],
      req['role'],
      { status: EOrderStatus.CANCELED },
    );
    return { data, message: 'order canceled' };
  }

  @Put('update/:id')
  @Roles([ERole.ADMIN])
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateOrderDto,
    @Req() req: IAppRequest,
  ): TApiResponse<Order> {
    const data = await this.ordersService.updateOrder(
      id,
      req['userId'],
      req['role'],
      body,
    );
    return { data, message: 'order updated' };
  }
}
