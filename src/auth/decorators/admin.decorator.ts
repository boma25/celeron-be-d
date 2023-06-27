import { SetMetadata } from '@nestjs/common';
import { EAdminType } from 'src/@types/enums';

export const ADMIN_KEY = 'super-admin';
export const AdminDecorator = (adminType: EAdminType) =>
  SetMetadata(ADMIN_KEY, adminType);
