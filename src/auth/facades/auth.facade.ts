import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/LoginDTO';

@Injectable()
export class AuthFacade {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  login(data: LoginDTO) {
    return this.authService.login({ userId: 1, username: data.login });
  }
}
