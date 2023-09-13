import { IsOptional, IsUUID } from 'class-validator';
import { updateAddressDto } from 'src/user/Dto/updateAddress.dto';

export class CheckoutDto extends updateAddressDto {
  @IsUUID()
  @IsOptional()
  addressId: string;
}
