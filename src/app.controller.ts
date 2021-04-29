import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  getMyEndPoint() {
    return 'Return all products';
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
