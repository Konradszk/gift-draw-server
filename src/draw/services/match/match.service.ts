import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Match } from '../../domain/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {

  public constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>) {
  }

  createMatches(matches: Match[]): Observable<Match[]> {
    return from(this.matchRepository.save(matches));
  }
}
