import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId: number = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Desc product 1',
      price: 122,
      stock: 6,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const newProduct: Product = {
      ...payload,
      id: this.counterId,
    };
    this.products = [...this.products, newProduct];
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const indexProduct = this.products.findIndex((p) => p.id === id);
      this.products[indexProduct] = {
        ...this.products[indexProduct],
        ...payload,
      };
      return this.products[indexProduct];
    }
    return null;
  }

  delete(id: number) {
    const indexProduct = this.products.findIndex((p) => p.id === id);
    if (indexProduct === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(indexProduct, 1);
    return true;
  }
}
