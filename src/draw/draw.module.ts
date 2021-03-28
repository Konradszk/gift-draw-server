import { Module } from '@nestjs/common';
import { DrawController } from './controllers/draw.controller';
import { DrawService } from './services/draw.service';
import { DrawFacade } from './facades/draw.facade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Draw } from './domain/draw.entity';
import { Participant } from './domain/participant.entity';
import { ParticipantService } from './services/participant/participant.service';
import { Match } from './domain/match.entity';
import { MatchService } from './services/match/match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Participant, Draw])],
  controllers: [DrawController],
  providers: [DrawService, DrawFacade, ParticipantService, MatchService],
  exports: [TypeOrmModule]
})
export class DrawModule {}
