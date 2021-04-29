import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getAll() {
    return { customers: 'fine' };
  }
}
