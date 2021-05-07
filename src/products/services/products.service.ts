import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    const products = await this.productModel.find().exec();
    return {
      products,
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counterId++;
  //   const newProduct: Product = {
  //     ...payload,
  //     id: this.counterId,
  //   };
  //   this.products = [...this.products, newProduct];
  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const indexProduct = this.products.findIndex((p) => p.id === id);
  //     this.products[indexProduct] = {
  //       ...this.products[indexProduct],
  //       ...payload,
  //     };
  //     return this.products[indexProduct];
  //   }
  //   return null;
  // }

  // delete(id: number) {
  //   const indexProduct = this.products.findIndex((p) => p.id === id);
  //   if (indexProduct === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(indexProduct, 1);
  //   return true;
  // }
}
