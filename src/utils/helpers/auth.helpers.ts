import { hash, compare } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { TSerializedUser, TUser } from 'src/@types/app.types';

const jwt = new JwtService();

const generateToken = async (user: TUser): Promise<string> => {
  // return await jwt.signAsync({ id: user.id, email: user.email });
  return;
};

const serializeUser = (user: TUser): TSerializedUser => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { password, ...serializedUser } = user;
  return {};
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
  const passwordText = `admin${generateOtp()}fcsl`;
  const password = await hashPassword(passwordText);
  return { password, passwordText };
};

export const authHelpers = {
  serializeUser,
  hashPassword,
  verifyPassword,
  generateOtp,
  generateToken,
  generateAdminPassword,
};
