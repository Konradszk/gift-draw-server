import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '../../domain/participant.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class ParticipantService {
  public constructor(
    @InjectRepository(Participant)
    private readonly drawRepository: Repository<Participant>,
  ) {
  }

  public createParticipants(participants: Participant[]): Observable<Participant[]> {
    return from(this.drawRepository.save(participants));
  }
}
