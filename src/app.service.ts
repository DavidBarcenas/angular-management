import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  constructor() {}
  // @Inject('MONGO') private databse: Db

  getTasks(): any {
    // const taskCollection = this.databse.collection('tasks');
    // return taskCollection.find().toArray();
    return {
      message: 'works!',
    };
  }
}
