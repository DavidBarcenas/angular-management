import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { dbValidationSchema } from './schemas/validation.schema';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
import databaseConfig from './database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: dbValidationSchema
    }),
    DatabaseModule,
    TasksModule
  ]
})
export class AppModule {}
