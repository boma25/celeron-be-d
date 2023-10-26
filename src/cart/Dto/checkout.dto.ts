import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CheckoutDto {
  @IsUUID()
  addressId: string;

  @IsString()
  @IsNotEmpty()
  reference: string;
}
