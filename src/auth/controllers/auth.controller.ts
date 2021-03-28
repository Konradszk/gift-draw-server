import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthFacade } from '../facades/auth.facade';
import { LoginDTO } from '../dto/LoginDTO';
import { Response } from 'express';
import { SignUpDTO } from '../dto/SignUpDTO';
import { Public } from '../guards/public.addnotation';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authFacade: AuthFacade,
  ) {
  }

  @Public()
  @Post('login')
  async login(@Body() req: LoginDTO,
              @Res() res: Response) {
    const accessToken: string = await this.authFacade.login(req);
    res.header('Authorization', accessToken);
    res.status(HttpStatus.OK).send();
  }

  @Public()
  @Post('register')
  async register(@Body() dto: SignUpDTO,
           @Res() res: Response) {
    const newUserData = await this.authFacade.signUpUser(dto).toPromise();
    res.header('Authorization', newUserData.accessToken);
    res.status(HttpStatus.OK)
    res.json({...newUserData})
    res.send();
  }

}
