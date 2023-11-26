import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { addToCartDto } from './Dto/addToCart.dto';
import { ProductsService } from 'src/products/products.service';
import { UpdateQuantityDto } from './Dto/updateQuantity.dto';
import { UserService } from 'src/user/user.service';
import { OrdersService } from 'src/orders/orders.service';
import { setCartDto } from './Dto/setCart.dto';
import { CheckoutDto } from './Dto/checkout.dto';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class CartService {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductsService,
    private userService: UserService,
    private orderService: OrdersService,
    private transactionService: TransactionsService,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: { userId },
      include: {
        products: { include: { product: { include: { medias: true } } } },
      },
    });
    if (!cart) throw new BadRequestException('invalid user id');
    return cart;
  }

  async addItemToCart(userId: string, payload: addToCartDto): Promise<Cart> {
    const { quantity, color, size } = payload;
    const product = await this.productService.findProductById(
      payload.productId,
    );
    if (!product) throw new BadRequestException('invalid product');
    if (product.quantity < quantity)
      throw new BadRequestException('cannot add more than available in stock');
    const cart = await this.getCart(userId);
    const productInCart = await this.prismaService.orderProduct.findFirst({
      where: { productId: product.id, cartId: cart.id },
    });
    if (productInCart)
      return await this.updateQuantity(userId, {
        productId: product.id,
        quantity,
      });

    if (!product.colors.toString().includes(color))
      throw new BadRequestException('invalid color');
    if (!product.sizes.toString().includes(size))
      throw new BadRequestException('invalid size');

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
    const order = await this.prismaService.orderProduct.findFirst({
      where: { cartId: cart.id, productId },
    });
    if (!order) throw new BadRequestException('invalid order product id');
    const orderProduct = await this.prismaService.orderProduct.delete({
      where: { id: order.id },
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

  async emptyCart(userId: string): Promise<Cart> {
    const cart = await this.getCart(userId);
    if (!cart) throw new BadRequestException('invalid user id');
    return await this.updateCart(userId, { total: 0 });
  }

  async updateCart(
    userId: string,
    data: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    return await this.prismaService.cart.update({
      where: { userId },
      data,
      include: {
        products: { include: { product: { include: { medias: true } } } },
      },
    });
  }

  async checkout(userId: string, payload: CheckoutDto): Promise<Cart> {
    const addressExist = await this.userService.findAddressById(
      payload.addressId,
      userId,
    );

    if (!addressExist) throw new BadRequestException('invalid address id');

    const cart = await this.getCart(userId);
    const orderProducts = await this.prismaService.orderProduct.findMany({
      where: { cartId: cart.id },
    });
    if (!orderProducts.length) throw new BadRequestException('cart is empty');

    const transaction =
      await this.transactionService.findTransactionByReference(
        payload.reference,
      );

    const order = await this.orderService.createOrder({
      total: cart.total,
      User: { connect: { id: userId } },
      deliveryAddress: { connect: { id: payload.addressId } },
      transaction: { connect: { id: transaction.id } },
      shippingFee: 5000,
    });

    await this.prismaService.orderProduct.updateMany({
      where: { cartId: cart.id },
      data: { orderId: order.id, cartId: null },
    });
    return await this.emptyCart(userId);
  }

  async setCart(userId: string, { products }: setCartDto): Promise<Cart> {
    if (products.length > 0) {
      await this.updateCart(userId, { total: 0, products: { deleteMany: {} } });
      for (const { productId, size, color, quantity } of products) {
        const productExist = await this.productService.findProductById(
          productId,
        );
        if (!productExist || productExist.quantity === 0) continue;
        await this.addItemToCart(userId, {
          productId,
          size,
          color,
          quantity:
            quantity > productExist.quantity ? productExist.quantity : quantity,
        });
      }
    }
    return await this.getCart(userId);
  }
}
