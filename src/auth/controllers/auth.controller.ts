import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { NoGuard } from '../guards/no.guard';
import { AuthFacade } from '../facades/auth.facade';
import { LoginDTO } from '../dto/LoginDTO';
import { Response } from 'express';
import { SignUpDTO } from '../dto/SignUpDTO';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authFacade: AuthFacade,
  ) {
  }

  @UseGuards(NoGuard)
  @Post('login')
  async login(@Body() req: LoginDTO,
              @Res() res: Response) {
    const accessToken: string = await this.authFacade.login(req);
    res.header('Authorization', accessToken);
    res.status(HttpStatus.OK).send();
  }

  @UseGuards(NoGuard)
  @Post('register')
  async register(@Body() dto: SignUpDTO,
           @Res() res: Response) {
    const newUserData = await this.authFacade.signUpUser(dto);
    res.header('Authorization', newUserData.accessToken);
    res.status(HttpStatus.OK)
    res.json({...newUserData})
    res.send();
  }

}
