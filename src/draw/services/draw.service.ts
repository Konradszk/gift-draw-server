import { Injectable } from '@nestjs/common';
import { Draw } from '../domain/draw';
import { InjectRepository, Repository } from '@nestjs/azure-database/dist';
import { from, Observable } from 'rxjs';

@Injectable()
export class DrawService {
  constructor(
    @InjectRepository(Draw)
    private readonly drawRepository: Repository<Draw>,
  ) {}

   createDraw(draw:Draw): Promise<Draw> {
    return this.drawRepository.create(draw)
  }

   public getById(id: string):Observable<Draw> {
    return from(this.drawRepository.find(id, new Draw()));
  }
}
