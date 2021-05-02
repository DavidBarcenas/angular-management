import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dto/customer.dto';
import { CustomersService } from 'src/users/services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.OK)
  get(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.findOne(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':customerId')
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(customerId, payload);
  }

  @Delete(':customerId')
  delete(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.delete(customerId);
  }
}
