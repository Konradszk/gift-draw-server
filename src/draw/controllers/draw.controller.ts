import { Controller, Get, Param } from '@nestjs/common';
import { DrawFacade } from '../facades/draw.facade';
import { Observable } from 'rxjs';
import { DrawDTO } from '../dto/DrawDTO';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawFacade: DrawFacade) {
  }

  @Get('test')
  getHello(): string {
    return 'hello';
  }

  @Get(':id')
  public  getDrawByID(@Param('id') id: string): Observable<DrawDTO>{
    return this.drawFacade.getDrawByID(id);
  }
}
