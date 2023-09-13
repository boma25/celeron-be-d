import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class addToCartDto {
  @IsUUID()
  product: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  color: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  size: string;
}
