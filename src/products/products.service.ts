import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateProductDto } from './Dto/updateProduct.dto';
import { ERole, EVisibilityStatus, Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './Dto/createProduct.dto';
import { TServerResponse } from 'src/@types/app.types';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findProductById(id: string, role?: ERole): Promise<Product | null> {
    const where: Prisma.ProductWhereUniqueInput = { id };
    if (role === ERole.USER) {
      where['status'] = EVisibilityStatus.LIVE;
    }
    const product = await this.prismaService.product.findUnique({
      where,
      include: { manufacturer: true, medias: true, model: true },
    });
    if (!product) throw new BadRequestException('invalid product id');
    return product;
  }

  async findAllProducts(role?: ERole): Promise<TServerResponse<Product[]>> {
    const where: Prisma.ProductWhereInput = {};
    if (role !== ERole.ADMIN) {
      where['status'] = EVisibilityStatus.LIVE;
    }
    const data = await this.prismaService.product.findMany({
      where,
      include: { manufacturer: true, medias: true, model: true },
    });
    return { data };
  }

  async createProduct(payload: CreateProductDto): Promise<Product> {
    payload.name = payload.name.toLowerCase();
    const productExist = await this.prismaService.product.findUnique({
      where: { name: payload.name },
    });
    if (productExist)
      throw new BadRequestException('a product with this name already exists');

    const { manufacturer, model, media, ...rest } = payload;
    const manufacturerExist =
      manufacturer &&
      (await this.prismaService.manufacturer.findUnique({
        where: { id: payload?.manufacturer },
      }));
    const modelExist =
      model &&
      (await this.prismaService.model.findUnique({
        where: { id: payload?.model },
      }));

    if (payload?.manufacturer && !manufacturerExist)
      throw new BadRequestException('invalid manufacturer');

    if (payload?.model && !modelExist)
      throw new BadRequestException('invalid model');

    const data: Prisma.ProductCreateInput = rest;

    if (manufacturerExist) {
      data['manufacturer'] = { connect: { id: manufacturer } };
    }

    if (modelExist) {
      data['model'] = { connect: { id: model } };
    }

    const product = await this.prismaService.product.create({
      data,
      include: { manufacturer: true, medias: true, model: true },
    });

    if (media) {
      const data: Prisma.ProductMediaCreateManyInput[] = [];
      for (const { mediaType, media_url } of media) {
        data.push({ media_url, mediaType, productId: product.id });
      }
      await this.prismaService.productMedia.createMany({ data });
    }
    return product;
  }

  async updateProduct(id: string, payload: UpdateProductDto): Promise<Product> {
    await this.findProductById(id);

    const { manufacturer, model, media, ...rest } = payload;

    const manufacturerExist =
      manufacturer &&
      (await this.prismaService.manufacturer.findUnique({
        where: { id: payload?.manufacturer },
      }));

    const modelExist =
      model &&
      (await this.prismaService.model.findUnique({
        where: { id: payload?.model },
      }));

    if (payload?.manufacturer && !manufacturerExist)
      throw new BadRequestException('invalid manufacturer');

    if (payload?.model && !modelExist)
      throw new BadRequestException('invalid model');

    const data: Prisma.ProductUpdateInput = rest;

    if (manufacturerExist) {
      data['manufacturer'] = { connect: { id: manufacturer } };
    }
    if (modelExist) {
      data['model'] = { connect: { id: model } };
    }

    if (media) {
      const data: Prisma.ProductMediaCreateManyInput[] = [];
      for (const { mediaType, media_url } of media) {
        data.push({ media_url, mediaType, productId: id });
      }
      await this.prismaService.productMedia.createMany({ data });
    }
    if (rest?.name) {
      data['name'] = rest.name?.toLowerCase();
    }
    return await this.prismaService.product.update({
      where: { id },
      data,
      include: { manufacturer: true, medias: true, model: true },
    });
  }

  async findRelatedProducts(id: string): Promise<Product[]> {
    const product = await this.findProductById(id);
    return await this.prismaService.product.findMany({
      where: { status: EVisibilityStatus.LIVE },
      take: 4,
      include: { manufacturer: true, medias: true, model: true },
    });
  }
}
