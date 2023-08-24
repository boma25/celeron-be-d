import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { ERole } from 'src/@types/enums';
import { TSerializedUser } from 'src/@types/app.types';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token && !isPublic) throw new UnauthorizedException();

    if (isPublic && !token) return true;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request['userId'] = payload.id;
      request['email'] = payload.email;
      request['role'] = payload.role;
      if (payload.role === ERole.ADMIN) {
        request['adminType'] = payload.adminType;
      }

      let user: TSerializedUser;
      if (payload.role === ERole.ADMIN) {
        user = await this.adminService.findAdmin({ id: payload.id });
      } else if (payload.role === ERole.USER) {
        user = await this.userService.findUser({ id: payload.id });
      }

      //TODO => add method to set user
      if (!user) throw new UnauthorizedException('invalid auth token');
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
