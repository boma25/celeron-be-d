import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { LoginDto } from './login.dto';

export class ProductType {
  @IsString()
  product: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be a positive number' })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;
}
export class CartDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  products: ProductType[];
}

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

  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  countryCode: string;

  @IsOptional()
  @IsObject()
  cart: CartDto;
}
