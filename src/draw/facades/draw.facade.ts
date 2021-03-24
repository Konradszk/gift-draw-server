import { Observable } from 'rxjs';
import { DrawDTO } from '../dto/DrawDTO';
import { Injectable } from '@nestjs/common';
import { DrawService } from '../services/draw.service';
import { CreateDrawDTO } from '../dto/CreateDrawDTO';
import { Draw } from '../domain/draw.entity';
import { ParticipantService } from '../services/participant/participant.service';

@Injectable()
export class DrawFacade {

  constructor(
    private readonly drawService: DrawService,
    private readonly participantService: ParticipantService
  ) {
  }

  public getDrawByID(id: number): Observable<DrawDTO> {
    return this.drawService.getById(id);
  }

  createDraw(dto: CreateDrawDTO) {
    return this.drawService.createDraw(Draw.fromDto(dto));
  }
}
