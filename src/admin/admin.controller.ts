import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  IAppRequest,
  TApiResponse,
  TQueryParams,
  TSerializedUser,
} from 'src/@types/app.types';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ERole } from 'src/@types/enums';
import { AddAdminDto } from './Dto/addAdmin.dto';
import { ChangePasswordDto } from './Dto/changePasswordDto';

@Roles([ERole.ADMIN])
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('all-admins')
  async getAllAdmins(
    @Query() query: TQueryParams,
    @Req() req: IAppRequest,
  ): TApiResponse<TSerializedUser[]> {
    const data = await this.adminService.findAllAdmins(req['userId']);
    return { data, message: 'admins fetched successfully' };
  }

  @Get(':id')
  async getAdmin(
    @Param('id', ParseUUIDPipe) id: string,
  ): TApiResponse<TSerializedUser> {
    const data = await this.adminService.findAdminById(id);
    return { data, message: 'admin fetched successfully' };
  }

  @Post('/add-admin')
  async addAdmin(@Body() body: AddAdminDto): TApiResponse<TSerializedUser> {
    const data = await this.adminService.addAdmin(body);
    return { data, message: 'admin added successfully' };
  }

  @Put('/change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() req: IAppRequest,
  ): TApiResponse {
    await this.adminService.changePassword(req['userId'], body);
    return { message: 'password changed successfully' };
  }

  @Put('/update-profile')
  async updateProfile(): TApiResponse<TSerializedUser> {
    return { message: 'profile updated successfully' };
  }

  @Delete('/delete-admin/:id')
  async deleteAdmin(@Param('id', ParseUUIDPipe) id: string): TApiResponse {
    await this.adminService.deleteAdmin(id);
    return { message: 'admin deleted' };
  }
}
