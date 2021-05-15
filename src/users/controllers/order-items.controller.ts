import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/order-item.dto';
import { OrderItemsService } from '../services/order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemService: OrderItemsService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  // create update, delete items
}
