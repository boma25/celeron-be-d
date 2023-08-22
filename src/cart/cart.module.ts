import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
