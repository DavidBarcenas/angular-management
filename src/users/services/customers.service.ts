import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dto/customer.dto';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'David',
      lastName: 'Bárcenas',
      phone: '3111111212',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((b) => b.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers = [...this.customers, newCustomer];
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);

    if (!customer) {
      return null;
    }

    const indexBrand = this.customers.findIndex((b) => b.id === id);
    this.customers[indexBrand] = {
      ...customer,
      ...payload,
    };

    return this.customers[indexBrand];
  }

  delete(id: number) {
    const indexCustomer = this.customers.findIndex((b) => b.id === id);

    if (indexCustomer === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    this.customers.splice(indexCustomer, 1);
    return true;
  }
}
