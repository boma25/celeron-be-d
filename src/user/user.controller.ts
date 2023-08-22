import { Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/change-password')
  async changePassword() {}

  @Put('/update-profile')
  async updateProfile() {}
}
