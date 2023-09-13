import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Match, NotMatch } from 'src/utils/helpers/decorators.helpers';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @NotMatch('currentPassword')
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @Match('password')
  confirmPassword: string;
}
