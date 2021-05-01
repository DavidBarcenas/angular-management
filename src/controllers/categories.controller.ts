import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { CategoriesService } from 'src/services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryId')
  @HttpCode(HttpStatus.OK)
  get(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findOne(categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':categoryId')
  update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, payload);
  }

  @Delete(':categoryId')
  delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.delete(categoryId);
  }
}
