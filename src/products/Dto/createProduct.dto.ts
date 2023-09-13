import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  manufacturer: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  model: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MediaDto)
  media: Pick<ProductMedia, 'mediaType' | 'media_url'>[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  color: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  size: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  configurable: boolean;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class MediaDto {
  @ApiProperty()
  @IsUrl()
  media_url: string;

  @ApiProperty()
  @IsEnum(EMediaType)
  mediaType: EMediaType;
}
