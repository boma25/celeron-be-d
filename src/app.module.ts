import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './utils/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AllExceptionsFilter } from './utils/globalExceptionFilter';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guards';
import { AuthGuard } from './auth/guards/auth.guard';
import { ResponseInterceptor } from './utils/globalResponseInterceptor';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    AdminModule,
    EmailModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
