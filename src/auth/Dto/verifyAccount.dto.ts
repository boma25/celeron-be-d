import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsOptional } from 'class-validator';
import { IsOtp } from 'src/utils/helpers/decorators.helpers';

export class VerifyAccountDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsOtp()
  otp: string;
}
