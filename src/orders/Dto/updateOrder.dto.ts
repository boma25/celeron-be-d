import { ApiProperty } from '@nestjs/swagger';
import { EOrderStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsEnum(EOrderStatus)
  @IsOptional()
  status?: EOrderStatus;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expectedDeliveryDate?: Date;
}
