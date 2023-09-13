import { EProductState, EVisibilityStatus, ProductMedia } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MediaDto } from './createProduct.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsUUID()
  manufacturer: string;

  @IsOptional()
  @IsUUID()
  model: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MediaDto)
  media: Pick<ProductMedia, 'mediaType' | 'media_url'>[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  color: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  size: string;

  @IsOptional()
  @IsBoolean()
  configurable: boolean;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsEnum(EVisibilityStatus)
  status: EVisibilityStatus;

  @IsOptional()
  @IsEnum(EProductState)
  state: EProductState;

  @IsOptional()
  @IsBoolean()
  achieved: boolean;

  @IsNumber()
  @IsOptional()
  quantity: number;
}
