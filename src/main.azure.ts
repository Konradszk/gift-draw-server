import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
  return app;
}
