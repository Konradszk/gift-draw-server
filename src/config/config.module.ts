import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDev } from './dev-db.config';
import { configProd } from './prod-db.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRoot(process.env.NODE_ENV === 'production' ? {...configProd} : {...configDev} )
  ],
})
export class ConfigModule {
}
