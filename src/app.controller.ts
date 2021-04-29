import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// TODO: crear endpoints para: orders, users, customers, brands

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
