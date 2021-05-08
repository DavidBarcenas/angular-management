import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((b) => b.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users = [...this.users, newUser];
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      return null;
    }

    const indexUser = this.users.findIndex((b) => b.id === id);
    this.users[indexUser] = {
      ...user,
      ...payload,
    };

    return this.users[indexUser];
  }

  delete(id: number) {
    const indexUser = this.users.findIndex((b) => b.id === id);

    if (indexUser === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }

    this.users.splice(indexUser, 1);
    return true;
  }
}
