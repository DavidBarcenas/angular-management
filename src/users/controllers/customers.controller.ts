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
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dto/customer.dto';
import { CustomersService } from 'src/users/services/customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.OK)
  get(@Param('customerId', MongoIdPipe) customerId: string) {
    return this.customersService.findOne(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':customerId')
  update(
    @Param('customerId', MongoIdPipe) customerId: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(customerId, payload);
  }

  @Delete(':customerId')
  delete(@Param('customerId', MongoIdPipe) customerId: string) {
    return this.customersService.delete(customerId);
  }
}
