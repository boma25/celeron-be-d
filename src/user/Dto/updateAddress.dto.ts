import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  zip: string;
}
