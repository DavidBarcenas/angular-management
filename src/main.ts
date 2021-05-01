import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quitara del payload todos los atributos que no esten definidos en el dto
      forbidNonWhitelisted: true, // mostrará un problema cuando se envien atributos demas
    }),
  );
  await app.listen(3000);
}
bootstrap();
