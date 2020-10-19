import { Injectable } from '@nestjs/common';
import { Draw } from '../domain/draw';
import { Observable, of } from 'rxjs';

@Injectable()
export class DrawService {
  constructor(
    // private readonly drawRepository: Repository<Draw>,
  ) {
  }

  createDraw(draw: Draw): Promise<Draw> {
    return new Promise<Draw>((resolve) => resolve(draw));
  }

  public getById(id: string): Observable<Draw> {
    return of(new Draw());
  }
}
