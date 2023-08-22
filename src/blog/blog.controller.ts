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
import { BlogService } from './blog.service';
import { ApiTags } from '@nestjs/swagger';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { Blog } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ERole } from 'src/@types/enums';
import { updateBlogDto } from './Dto/updateBlog.dto';
import { CreateBlogDto } from './Dto/createBlog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Public()
  async getBlogs(@Req() req: IAppRequest): TApiResponse<Blog[]> {
    const response = await this.blogService.findBlogs(req['role']);
    return {
      ...response,
      message: 'blogs fetched',
    };
  }

  @Get(':id')
  @Public()
  async getBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: IAppRequest,
  ): TApiResponse<Blog> {
    const data = await this.blogService.findBlog(id, req['role']);
    return {
      data,
      message: 'blog fetched',
    };
  }

  @Post('create')
  @Roles([ERole.ADMIN])
  async createBlog(@Body() body: CreateBlogDto): TApiResponse<Blog> {
    const data = await this.blogService.createBlog(body);
    return {
      data,
      message: 'blog created',
    };
  }

  @Put('update/:id')
  @Roles([ERole.ADMIN])
  async updateBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: updateBlogDto,
  ): TApiResponse<Blog> {
    const data = await this.blogService.updateBlog(id, body);
    return {
      data,
      message: 'blog updated',
    };
  }
}
