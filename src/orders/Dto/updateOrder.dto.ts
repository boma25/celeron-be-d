import { EOrderStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(EOrderStatus)
  @IsOptional()
  status?: EOrderStatus;

  @IsDateString()
  @IsOptional()
  expectedDeliveryDate?: Date;
}
