import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTasks(): string {
    return this.appService.getTasks();
  }

  @Get('notGuard')
  @Public()
  notGuard(): string {
    return this.appService.getTasks();
  }
}
