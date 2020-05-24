import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrawController } from './draw/draw.controller';

@Module({
  imports: [],
  controllers: [AppController, DrawController],
  providers: [AppService],
})
export class AppModule {}
