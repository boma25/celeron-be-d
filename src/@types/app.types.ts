import {
  Admin,
  EAdminType,
  ERole,
  EVisibilityStatus,
  User,
} from '@prisma/client';
import { Request } from 'express';

export type TSerializedUser = Omit<User | Admin, 'password'>;

export type TServerResponse<T> = {
  data?: T;
  message?: string;
  total?: number;
  page?: number;
};

export type TApiResponse<T = object> = Promise<TServerResponse<T>>;

export type TLoginResponse = {
  user: TSerializedUser;
  authToken: string;
};

export type TMailOptions = {
  from?: string;
  to: string[];
  subject: string;
  html: string;
};

export type TQueryParams = {
  limit?: number;
  page?: number;
  search?: string;
  visibilityStatus?: EVisibilityStatus;
};

export type TPaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
};

export interface IAppRequest extends Request {
  userId: string;
  email: string;
  role: ERole;
  adminType: EAdminType;
}
