import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getMyEndPoint(
    @Query('limit') limit: number = 50,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return { limit, offset, brand };
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return `Search only the ${productId} product`;
  }
}
