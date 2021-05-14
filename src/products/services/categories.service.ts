import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoriesRepo.find();
  }

  findOne(id: number) {
    const category = this.categoriesRepo.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoriesRepo.create(data);
    return this.categoriesRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoriesRepo.findOne(id);
    this.categoriesRepo.merge(category, changes);
    return this.categoriesRepo.save(category);
  }

  delete(id: number) {
    return this.categoriesRepo.delete(id);
  }
}
