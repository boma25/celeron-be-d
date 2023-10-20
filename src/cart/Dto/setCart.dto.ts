import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductType {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be a positive number' })
  quantity: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  size: string;
}

export class setCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  products: ProductType[];
}
