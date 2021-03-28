import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { DrawFacade } from '../facades/draw.facade';
import { Observable } from 'rxjs';
import { DrawDTO } from '../dto/DrawDTO';
import { CreateDrawDTO } from '../dto/CreateDrawDTO';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawFacade: DrawFacade) {
  }

  @Get(':id')
  public getDrawByID(@Param('id') id: number): Observable<DrawDTO> {
    return this.drawFacade.getDrawByID(id);
  }

  @Post()
  public createDraw(@Body() dto: CreateDrawDTO, @Request() req): Observable<DrawDTO> {
    const userData = req.user;
    return this.drawFacade.createDraw(dto, userData);
  }
}
