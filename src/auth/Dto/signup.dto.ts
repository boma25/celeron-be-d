import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { LoginDto } from './login.dto';
import { Match } from 'src/utils/helpers/decorators.helpers';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto extends LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

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

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  countryCode: string;
}
