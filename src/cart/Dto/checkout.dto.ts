import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { updateAddressDto } from 'src/user/Dto/updateAddress.dto';

export class CheckoutDto extends updateAddressDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  addressId: string;
}
