import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/product.dto';
import { ProductsService } from 'src/products/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit: number = 50,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  get(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
