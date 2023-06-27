import { SetMetadata } from '@nestjs/common';
import { ERole } from 'src/@types/enums';

export const ROLE_KEY = 'role';
export const Roles = (role: ERole) => SetMetadata(ROLE_KEY, role);
