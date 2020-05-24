import { Controller, Get } from '@nestjs/common';

@Controller('draw')
export class DrawController {

  @Get('test')
  getHello(): string {
    return 'hello';
  }
}
