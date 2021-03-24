import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '../../domain/participant.entity';

@Injectable()
export class ParticipantService {
  public constructor(
    @InjectRepository(Participant)
    private readonly drawRepository: Repository<Participant>,
  ) {
  }
}
