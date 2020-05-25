import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthFacade } from '../facades/auth.facade';
import { LoginDTO } from '../dto/LoginDTO';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authFacade: AuthFacade
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req:LoginDTO) {
    console.log('test');
    console.log(req);
    return this.authFacade.login(req);
  }

}
