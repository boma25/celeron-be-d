import { ApiProperty } from '@nestjs/swagger';
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
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EVisibilityStatus)
  status: EVisibilityStatus;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EProductState)
  state: EProductState;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  achieved: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;
}
