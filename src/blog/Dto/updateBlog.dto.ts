import { ApiProperty } from '@nestjs/swagger';
import { EVisibilityStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class updateBlogDto {
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  coverImage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsEnum(EVisibilityStatus)
  @IsOptional()
  status: EVisibilityStatus;
}
