import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { UserModule } from 'src/user/user.module';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [ProductsModule, OrdersModule, UserModule, TransactionsModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
