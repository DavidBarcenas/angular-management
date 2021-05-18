import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // findAll() {
  //   return this.users;
  // }

  // findOne(id: number) {
  //   const user = this.users.find((b) => b.id === id);
  //   if (!user) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   return user;
  // }

  async create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const model = await newUser.save();
    const { password, ...rest } = model.toJSON();
    return rest;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  // update(id: number, payload: UpdateUserDto) {
  //   const user = this.findOne(id);

  //   if (!user) {
  //     return null;
  //   }

  //   const indexUser = this.users.findIndex((b) => b.id === id);
  //   this.users[indexUser] = {
  //     ...user,
  //     ...payload,
  //   };

  //   return this.users[indexUser];
  // }

  // delete(id: number) {
  //   const indexUser = this.users.findIndex((b) => b.id === id);

  //   if (indexUser === -1) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }

  //   this.users.splice(indexUser, 1);
  //   return true;
  // }

  // async getOrdersByUser(id: number) {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user: user,
  //     products: await this.productsService.findAll(),
  //   };
  // }
}
