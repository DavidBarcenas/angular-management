import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          password,
          username: user,
          database: dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
