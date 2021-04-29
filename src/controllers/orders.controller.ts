import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll() {
    return { orders: 'Fine' };
  }
}
