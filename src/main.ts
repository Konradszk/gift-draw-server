import { ValidationPipe } from '@nestjs/common';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log','debug', 'error']
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
