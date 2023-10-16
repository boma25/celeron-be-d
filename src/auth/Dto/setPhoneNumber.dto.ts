import { IsEmail, IsNumberString, IsString } from 'class-validator';

export class SetPhoneNumberDto {
  @IsEmail()
  email: string;

  @IsNumberString()
  phoneNumber: string;

  @IsString()
  countryCode: string;
}
