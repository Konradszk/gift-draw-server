import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { DrawController } from './controllers/draw/draw.controller';

@Module({
  imports: [],
  controllers: [AppController, DrawController],
  providers: [AppService],
})
export class AppModule {}
