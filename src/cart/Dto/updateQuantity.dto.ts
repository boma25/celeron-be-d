import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
}
