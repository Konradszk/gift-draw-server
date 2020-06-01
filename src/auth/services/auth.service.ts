import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { hash } from 'bcrypt';
import { of } from 'rxjs';
import { LoginData } from '../domain/login-data.interface';
import { LoggedData } from '../domain/logged-data.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.userService.findOne(username);
    const hashedPass = await hash(password, 10);
    if (user.password === hashedPass) {
      const { password, ...result } = user;
      return of(result).toPromise();
    }

    throw new UnauthorizedException();
  }

  async login(user: LoginData): Promise<LoggedData> {
    const payload = { username: user.login, sub: 4 };
    const token: string = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }
}
