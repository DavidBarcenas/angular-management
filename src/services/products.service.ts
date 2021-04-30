import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
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
    return this.products.filter((p) => p.id === id);
  }

  create(payload: any) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products = [...this.products, newProduct];
    return newProduct;
  }

  update(id: number, payload: any) {
    const indexProduct = this.products.findIndex((p) => p.id === id);
    this.products[indexProduct] = { ...payload };

    return { ...payload };
  }

  delete(id: number) {
    const indexProduct = this.products.findIndex((p) => p.id === id);
    this.products.splice(indexProduct, 1);
  }
}
