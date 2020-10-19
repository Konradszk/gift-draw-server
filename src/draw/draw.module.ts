import { Module } from '@nestjs/common';
import { DrawController } from './controllers/draw.controller';
import { DrawService } from './services/draw.service';
import { DrawFacade } from './facades/draw.facade';

@Module({
  imports: [],
  controllers: [DrawController],
  providers: [DrawService, DrawFacade],
})
export class DrawModule {}
