import { IsNumber, IsUUID, Min } from 'class-validator';

export class UpdateQuantityDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
