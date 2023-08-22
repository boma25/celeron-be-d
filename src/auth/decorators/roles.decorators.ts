import { SetMetadata } from '@nestjs/common';
import { ERole } from 'src/@types/enums';

export const ROLE_KEY = 'role';
export const Roles = (roles: ERole[]) => SetMetadata(ROLE_KEY, roles);
