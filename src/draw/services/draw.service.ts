import { Injectable } from '@nestjs/common';
import { Draw } from '../domain/draw.entity';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { handleNotFound } from '../../shared/rxjs-operators/handle-not-found';
import { User } from '../../user/domain/user.entity';

@Injectable()
export class DrawService {
  constructor(
    @InjectRepository(Draw)
    private readonly drawRepository: Repository<Draw>,
  ) {
  }

  createDraw(draw: Draw, user: User): Observable<Draw> {
    draw.owner = user;
    return from(this.drawRepository.save(draw));
  }

  public getById(id: number): Observable<Draw> {
    return from(this.drawRepository.findOne(id, { relations: ['matches'] })).pipe(
      handleNotFound(id),
    );
  }
}
