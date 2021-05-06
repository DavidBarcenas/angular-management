import { Global, HttpModule, HttpService, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/?readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();

        const database = client.db(process.env.DATABASE_NAME);
        return database;
      },
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
