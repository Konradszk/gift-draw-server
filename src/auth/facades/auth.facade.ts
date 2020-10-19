import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/LoginDTO';
import { SignUpDTO } from '../dto/SignUpDTO';
import { UserService } from '../../user/services/user.service';
import { TokenData } from '../domain/token-data.interface';
import { User } from '../../user/domain/user.entity';

@Injectable()
export class AuthFacade {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  async login(data: LoginDTO): Promise<string> {
    const payload: TokenData = await this.authService.validateUser(data.login, data.password);
    const token = await this.authService.login(payload);
    return token.accessToken;
  }

  async signUpUser(dto: SignUpDTO): Promise<any> {
    const passwordHash: string = User.generateHash(dto.password);
    const user = await this.userService.register({ ...dto, passwordHash }).toPromise();
    const token = await this.authService.login({ username: user.name, sub: user.id.toString() });
    return {
      ...user,
      accessToken :token.accessToken,
    };
  }
}
