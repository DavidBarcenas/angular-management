import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getTasks(): any {
    return {
      message: 'hello world',
    };
  }
}
