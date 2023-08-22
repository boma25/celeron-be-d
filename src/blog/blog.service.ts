import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { updateBlogDto } from './Dto/updateBlog.dto';
import { Blog, ERole, EVisibilityStatus, Prisma } from '@prisma/client';
import { CreateBlogDto } from './Dto/createBlog.dto';
import { TServerResponse } from 'src/@types/app.types';

@Injectable()
export class BlogService {
  constructor(private prismaService: PrismaService) {}

  async findBlog(id: string, role?: ERole): Promise<Blog> {
    const where: Prisma.BlogWhereUniqueInput = { id };
    if (role === ERole.USER) {
      where['status'] = EVisibilityStatus.LIVE;
    }
    const blog = await this.prismaService.blog.findUnique({
      where,
    });
    if (!blog) throw new BadRequestException('invalid blog id');
    return blog;
  }

  async findBlogs(role?: ERole): Promise<TServerResponse<Blog[]>> {
    const where: Prisma.BlogWhereInput = {};
    if (role !== ERole.ADMIN) {
      where['status'] = EVisibilityStatus.LIVE;
    }
    const data = await this.prismaService.blog.findMany({
      where,
    });
    return { data };
  }

  async createBlog(data: CreateBlogDto): Promise<Blog> {
    const blogExist = await this.prismaService.blog.findUnique({
      where: { title: data.title.toLowerCase() },
    });
    if (blogExist)
      throw new BadRequestException('a blog with this title already exists');
    return await this.prismaService.blog.create({ data });
  }

  async updateBlog(id: string, data: updateBlogDto): Promise<Blog> {
    await this.findBlog(id);
    if (data['title']) data['title'] = data.title.toLowerCase();
    return await this.prismaService.blog.update({ where: { id }, data });
  }
}
