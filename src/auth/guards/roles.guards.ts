import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/roles.decorators';
import { ERole } from 'src/@types/enums';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<ERole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();

    if ((!roles && request.role === ERole.USER) || isPublic) return true;

    return roles?.includes(request.role);
  }
}
