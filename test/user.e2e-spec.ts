import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../src/user/domain/user.entity';
import { UserModule } from '../src/user/user.module';


describe('User', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
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
    }).compile();

    app = module.createNestApplication();

    repository = module.get('UserRepository');
    await app.init();
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
