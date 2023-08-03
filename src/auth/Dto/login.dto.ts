import { IsNotEmpty, IsString } from 'class-validator';
import { SendOtpDto } from './sendOtp.dto';

export class LoginDto extends SendOtpDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
