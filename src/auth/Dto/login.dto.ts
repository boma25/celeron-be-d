import { IsNotEmpty, IsString } from 'class-validator';
import { SendOtpDto } from './sendOtp.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends SendOtpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
