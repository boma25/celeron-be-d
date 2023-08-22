import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { addToCartDto } from './Dto/addToCart.dto';
import { ProductsService } from 'src/products/products.service';
import { UpdateQuantityDto } from './Dto/updateQuantity.dto';

@Injectable()
export class CartService {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductsService,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: { userId },
      include: { products: true },
    });
    if (!cart) throw new BadRequestException('invalid user id');
    return cart;
  }

  async addItemToCart(userId: string, payload: addToCartDto): Promise<Cart> {
    const { quantity, color, size } = payload;
    const product = await this.productService.findProductById(payload.product);
    if (!product) throw new BadRequestException('invalid product');
    const cart = await this.getCart(userId);
    const total = cart.total + product.price * quantity;
    return await this.updateCart(userId, {
      total,
      products: {
        create: [
          {
            productId: product.id,
            quantity,
            color,
            size,
          },
        ],
      },
    });
  }
  async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
    const product = await this.productService.findProductById(productId);
    if (!product) throw new BadRequestException('invalid product');
    const cart = await this.getCart(userId);
    const orderProduct = await this.prismaService.orderProduct.delete({
      where: { cartId: cart.id, productId },
    });
    const total = cart.total - orderProduct.quantity * product.price;
    return await this.updateCart(userId, {
      total,
    });
  }

  async updateQuantity(
    userId: string,
    payload: UpdateQuantityDto,
  ): Promise<Cart> {
    if (payload.quantity === 0)
      return this.removeItemFromCart(userId, payload.productId);

    const product = await this.productService.findProductById(
      payload.productId,
    );

    if (!product) throw new BadRequestException('invalid product');

    const cart = await this.getCart(userId);

    const orderProduct = await this.prismaService.orderProduct.findFirst({
      where: { cartId: cart.id, productId: product.id },
    });

    const quantity = payload.quantity;

    if (quantity > product.quantity)
      throw new BadRequestException('cannot add more than available in stock');

    await this.prismaService.orderProduct.update({
      where: { id: orderProduct.id },
      data: { quantity },
    });

    const total =
      cart.total +
      quantity * product.price -
      product.price * orderProduct.quantity;

    return await this.updateCart(userId, { total });
  }

  async updateCart(
    userId: string,
    data: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    return await this.prismaService.cart.update({
      where: { userId },
      data,
      include: { products: true },
    });
  }

  async checkout(userId: string): Promise<void> {
    const cart = await this.getCart(userId);
    const orderProducts = await this.prismaService.orderProduct.findMany({
      where: { cartId: cart.id },
    });
    if (!orderProducts.length) throw new BadRequestException('cart is empty');
  }
}
