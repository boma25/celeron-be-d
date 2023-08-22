import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class addToCartDto {
  @ApiProperty()
  @IsUUID()
  product: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  size: string;
}
