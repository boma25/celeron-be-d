import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class addToCartDto {
  @IsUUID()
  productId: string;

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
