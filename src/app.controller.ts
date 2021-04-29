import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  getMyEndPoint(
    @Query('limit') limit: number = 50,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return { limit, offset, brand };
  }

  @Get('product/:productId')
  getProduct(@Param('productId') productId: string) {
    return `Search only the ${productId} product`;
  }

  @Get('categories/:categoryId/products/:productId')
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `The id ${categoryId} of the category that brings the product with id ${productId}`;
  }
}
