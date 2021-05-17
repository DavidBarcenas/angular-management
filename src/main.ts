import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quitara del payload todos los atributos que no esten definidos en el dto
      forbidNonWhitelisted: true, // mostrará un problema cuando se envien atributos demas
      transformOptions: {
        enableImplicitConversion: true, // Habilita el parseo de los parametros
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API - Nestjs Course')
    .setDescription('The Nestjs Course API')
    .setVersion('1.0')
    .build();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
