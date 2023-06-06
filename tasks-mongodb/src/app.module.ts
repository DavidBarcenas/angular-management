import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import {environments} from "./environments";
import databaseConfig from "./database/database.config";
import {dbValidationSchema} from "./schemas/validation.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: dbValidationSchema
    }),
    DatabaseModule
  ]
})
export class AppModule {}
