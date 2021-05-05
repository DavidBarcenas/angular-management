import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: string,
  ) {}

  getHello(): any {
    return {
      key: this.apiKey,
      tasks: this.tasks,
    };
  }
}
