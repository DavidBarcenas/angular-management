import { Global, HttpModule, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from 'src/config';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, host, port, dbName } = configService.mongo;
        const uri = `${connection}://${host}:${port}/?readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();

        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
