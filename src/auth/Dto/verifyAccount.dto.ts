import { IsEmail, IsNumberString } from 'class-validator';
import { IsOtp } from 'src/utils/helpers/decorators.helpers';

export class VerifyAccountDto {
  @IsEmail()
  email: string;

  @IsNumberString()
  phoneNumber: string;

  @IsOtp()
  otp: string;
}
