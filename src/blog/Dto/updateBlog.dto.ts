import { EVisibilityStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class updateBlogDto {
  @IsUrl()
  @IsOptional()
  coverImage: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsEnum(EVisibilityStatus)
  @IsOptional()
  status: EVisibilityStatus;
}
