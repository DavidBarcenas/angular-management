import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from './entities/user.entity';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    ProfileController,
  ],
  providers: [CustomersService, UsersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
