import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import config from './config';
import { MongoClient } from 'mongodb';

const uri = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/?readPreference=primary`;
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const database = client.db(process.env.DATABASE_NAME);
  const taskCollection = database.collection(
    process.env.DATABASE_TASKS_COLLECTION,
  );
  const tasks = await taskCollection.find().toArray();

  console.log('tareas', tasks);
}
console.log('uri', uri);
// run();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
