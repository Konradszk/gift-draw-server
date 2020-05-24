import { Observable } from 'rxjs';
import { DrawDTO } from '../dto/DrawDTO';
import { Injectable } from '@nestjs/common';
import { DrawService } from '../services/draw.service';

@Injectable()
export class DrawFacade {

  constructor(
    private readonly drawService: DrawService
  ) {
  }

  public getDrawByID(id: string): Observable<DrawDTO> {
    return this.drawService.getById(id);
  }
}
