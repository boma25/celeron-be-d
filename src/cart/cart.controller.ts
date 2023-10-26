import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { Cart } from '@prisma/client';
import { addToCartDto } from './Dto/addToCart.dto';
import { UpdateQuantityDto } from './Dto/updateQuantity.dto';
import { setCartDto } from './Dto/setCart.dto';
import { CheckoutDto } from './Dto/checkout.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: IAppRequest): TApiResponse<Cart> {
    const data = await this.cartService.getCart(req['userId']);
    return { data, message: 'cart fetched' };
  }

  @Post('add')
  async addToCartCart(
    @Body() body: addToCartDto,
    @Req() req: IAppRequest,
  ): TApiResponse<Cart> {
    const data = await this.cartService.addItemToCart(req['userId'], body);
    return { data, message: 'item added to cart successfully' };
  }

  @Post('remove/:productId')
  async removeFromCart(
    @Req() req: IAppRequest,
    @Param('productId', ParseUUIDPipe) productId: string,
  ): TApiResponse<Cart> {
    const data = await this.cartService.removeItemFromCart(
      req['userId'],
      productId,
    );
    return { data, message: 'item removed from cart successfully' };
  }

  @Put('update-quantity')
  async updateCart(
    @Body() body: UpdateQuantityDto,
    @Req() req: IAppRequest,
  ): TApiResponse<Cart> {
    const data = await this.cartService.updateQuantity(req['userId'], body);
    return { data, message: 'cart updated' };
  }

  @Post('checkout')
  async checkout(
    @Req() req: IAppRequest,
    @Body() body: CheckoutDto,
  ): TApiResponse<Cart> {
    await this.cartService.checkout(req['userId'], body);
    return { message: 'kindly proceed to payment' };
  }

  @Put('/set')
  async setCart(
    @Req() req: IAppRequest,
    @Body() body: setCartDto,
  ): TApiResponse<Cart> {
    const data = await this.cartService.setCart(req['userId'], body);
    return { data, message: 'cart set' };
  }
}
