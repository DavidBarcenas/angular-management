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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dto/brand.dto';
import { BrandService } from 'src/products/services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}

  @Get()
  getAll() {
    return this.brandService.findAll();
  }

  @Get(':brandId')
  @HttpCode(HttpStatus.OK)
  get(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.brandService.findOne(brandId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':brandId')
  update(
    @Param('brandId', MongoIdPipe) brandId: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(brandId, payload);
  }

  @Delete(':brandId')
  delete(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.brandService.delete(brandId);
  }
}
