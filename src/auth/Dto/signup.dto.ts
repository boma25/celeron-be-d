import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { LoginDto } from './login.dto';
import { Match } from 'src/utils/helpers/decorators.helpers';

export class SignUpDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @Match('password')
  confirmPassword: string;

  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  countryCode: string;
}
