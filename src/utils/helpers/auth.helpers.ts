import { hash, compare } from 'bcrypt';
import { Admin, User } from '@prisma/client';
import { TSerializedUser } from 'src/@types/app.types';

const serializeUser = (user: User | Admin): TSerializedUser => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...serializedUser } = user;
  return serializedUser;
};

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

const generateOtp = (): number => {
  return Math.floor(Math.random() * 900000);
};

const generateAdminPassword = async (): Promise<{
  password: string;
  passwordText: string;
}> => {
  const passwordText = `admin${generateOtp()}celeron`;
  const password = await hashPassword(passwordText);
  return { password, passwordText };
};

export const authHelpers = {
  serializeUser,
  hashPassword,
  verifyPassword,
  generateOtp,
  generateAdminPassword,
};
