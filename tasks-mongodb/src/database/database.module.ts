import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';

import databaseConfig from './database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (databaseService: ConfigType<typeof databaseConfig>) => {
        const { connection, user, password, name, params } = databaseService;
        return { uri: `${connection}${user}:${password}${name}${params}` };
      },
      inject: [databaseConfig.KEY]
    })
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}
