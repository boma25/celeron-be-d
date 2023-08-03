import { IsString, Matches, MinLength } from 'class-validator';
import { Match } from 'src/utils/helpers/decorators.helpers';
import { SendOtpDto } from './sendOtp.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends SendOtpDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Match('password')
  confirmPassword: string;
}
