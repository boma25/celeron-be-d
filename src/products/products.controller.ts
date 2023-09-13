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
import { ProductsService } from './products.service';

import { CreateProductDto } from './Dto/createProduct.dto';
import { UpdateProductDto } from './Dto/updateProduct.dto';
import { IAppRequest, TApiResponse } from 'src/@types/app.types';
import { Product } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ERole } from 'src/@types/enums';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  async getProducts(@Req() req: IAppRequest): TApiResponse<Product[]> {
    const response = await this.productsService.findAllProducts(req['role']);
    return { ...response, message: 'products fetched' };
  }

  @Get(':id')
  @Public()
  async getProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: IAppRequest,
  ): TApiResponse<Product> {
    const data = await this.productsService.findProductById(
      id,
      req['role'] || ERole.USER,
    );
    return { data, message: 'product fetched' };
  }

  @Roles([ERole.ADMIN])
  @Post('/create-product')
  async createProduct(@Body() body: CreateProductDto): TApiResponse<Product> {
    const data = await this.productsService.createProduct(body);
    return { data, message: 'product created' };
  }

  @Roles([ERole.ADMIN])
  @Put('/update-product/:id')
  async updateProduct(
    @Body() body: UpdateProductDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.productsService.updateProduct(id, body);
    return { data, message: 'product updated' };
  }
}
