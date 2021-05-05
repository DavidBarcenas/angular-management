import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dto/category.dto';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((b) => b.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories = [...this.categories, newCategory];
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);

    if (!category) {
      return null;
    }

    const indexCategory = this.categories.findIndex((b) => b.id === id);
    this.categories[indexCategory] = {
      ...category,
      ...payload,
    };

    return this.categories[indexCategory];
  }

  delete(id: number) {
    const indexCategory = this.categories.findIndex((b) => b.id === id);

    if (indexCategory === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    this.categories.splice(indexCategory, 1);
    return true;
  }
}
