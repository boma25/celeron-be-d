import { User } from '@prisma/client';

export type TSerializedUser = Omit<User, 'password'>;

export type TServerResponse<T> = {
  data?: T;
  message?: string;
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
