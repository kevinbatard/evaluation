import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');
  const config = new DocumentBuilder()
    .setTitle('Japan travels')
    .setDescription('Partagez vos souvenirs de voyage, ou préparez le votre !')
    .setVersion('1.0')
    .addTag('Japan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
