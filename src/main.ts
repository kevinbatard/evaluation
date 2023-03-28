import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');
  const config = new DocumentBuilder()
    .setTitle('Evaluation')
    .setDescription('Dashboard pour admin')
    .setVersion('1.0')
    .addTag('Eval')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe()); //Nécessaire à l'utilisation des class-validator dans le DTO

  await app.listen(8000);
}
bootstrap();
