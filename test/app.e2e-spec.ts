import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          'type': 'mssql',
          'host': 'localhost',
          'port': 1433,
          'username': 'gift_draw_db',
          'password': 'testdb',
          'database': 'gift_draw_local',
          'entities': ['./**/*.entity.ts'],
          'synchronize': false,
        }),
      ],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    console.error(process.env.DB_DATABASE_NAME, '<------------------------------');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/')
      .expect(200)
      .expect('Working!');
  });
});

