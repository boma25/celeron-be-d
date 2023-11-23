import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto } from './Dto/changePasswordd.dto';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { addAddressDto } from './Dto/addAddress.dto';
import { Address } from '@prisma/client';
import { updateAddressDto } from './Dto/updateAddress.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/addresses')
  async getAddresses(@Req() req: IAppRequest): TApiResponse<Address[]> {
    const data = await this.userService.findAddresses(req['userId']);
    return { data, message: 'addresses fetched' };
  }

  @Put('/change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() req: IAppRequest,
  ): TApiResponse {
    await this.userService.changePassword(req['userId'], body);
    return { message: 'password changed successfully' };
  }

  @Put('/update-profile')
  async updateProfile() {}

  @Post('/add-address')
  async addAddress(
    @Body() body: addAddressDto,
    @Req() req: IAppRequest,
  ): TApiResponse<Address> {
    const data = await this.userService.addAddress(req['userId'], body);
    return { data, message: 'address added' };
  }

  @Put('/update-address/:addressId')
  async updateAddress(
    @Body() body: updateAddressDto,
    @Param('addressId', ParseUUIDPipe) addressId: string,
  ): TApiResponse<Address> {
    const data = await this.userService.updateAddress(addressId, body);
    return { data, message: 'address updated' };
  }

  @Put('/set-default-address/:addressId')
  async setDefaultAddress(
    @Param('addressId', ParseUUIDPipe) addressId: string,
    @Req() req: IAppRequest,
  ): TApiResponse {
    await this.userService.setDefaultAddress(addressId, req['userId']);
    return { message: 'default address set' };
  }
}
