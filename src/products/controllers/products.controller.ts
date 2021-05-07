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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/product.dto';
import { ProductsService } from 'src/products/services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'List of all products' })
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
  get(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
