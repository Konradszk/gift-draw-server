import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/LoginDTO';
import { hash } from 'bcrypt';

@Injectable()
export class AuthFacade {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

   async login(data: LoginDTO): Promise<string> {
    const hashedPassWord: string = await hash(data.password, 10);
    const token = await this.authService.login({ login: data.login, passwordHash: hashedPassWord });
    return token.accessToken;
  }
}
