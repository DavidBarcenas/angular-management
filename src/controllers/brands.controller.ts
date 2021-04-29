import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getAll() {
    return {
      brands: 'fine',
    };
  }
}
