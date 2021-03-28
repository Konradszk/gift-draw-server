import { forkJoin, Observable } from 'rxjs';
import { DrawDTO } from '../dto/DrawDTO';
import { Injectable } from '@nestjs/common';
import { DrawService } from '../services/draw.service';
import { CreateDrawDTO } from '../dto/CreateDrawDTO';
import { Draw } from '../domain/draw.entity';
import { ParticipantService } from '../services/participant/participant.service';
import { Participant } from '../domain/participant.entity';
import { map, switchMap } from 'rxjs/operators';
import { MatchService } from '../services/match/match.service';
import { Match } from '../domain/match.entity';
import { User } from '../../user/domain/user.entity';

@Injectable()
export class DrawFacade {

  constructor(
    private readonly drawService: DrawService,
    private readonly participantService: ParticipantService,
    private readonly matchService: MatchService,
  ) {
  }

  public getDrawByID(id: number): Observable<DrawDTO> {
    return this.drawService.getById(id).pipe(
      map((draw: Draw) => DrawDTO.fromDomain(
        draw.matches.map(m => m.participant),
        draw,
      )),
    );
  }

  createDraw(dto: CreateDrawDTO, userData: { userId: string, username: string }) {
    return forkJoin({
      participants: this.participantService.createParticipants(Participant.fromList(dto.participants)),
      draw: this.drawService.createDraw(Draw.fromDto(dto), User.fromTokenData(userData.userId, userData.username)),
    }).pipe(
      switchMap(
        ({
           participants,
           draw,
         }) => this.matchService.createMatches(Match.fromParticipantsAndDraw(participants, draw))
          .pipe(
            map(() => DrawDTO.fromDomain(participants, draw)),
          ),
      ),
    );
  }
}
