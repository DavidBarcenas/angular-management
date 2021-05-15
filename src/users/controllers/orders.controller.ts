import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getAll() {
    return this.orderService.findAll();
  }

  @Get(':orderId')
  get(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findOne(orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':orderId')
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(orderId, payload);
  }

  @Delete(':orderId')
  delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }
}
