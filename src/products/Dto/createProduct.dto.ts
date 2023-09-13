import { EMediaType, ProductMedia } from '@prisma/client';
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
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
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
  name: string;

  @IsString()
  @IsNotEmpty()
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
  price: number;

  @IsNumber()
  quantity: number;
}

export class MediaDto {
  @IsUrl()
  media_url: string;

  @IsEnum(EMediaType)
  mediaType: EMediaType;
}
