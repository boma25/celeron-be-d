import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '3d' },
    }),
    UserModule,
    AdminModule,
    CartModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
