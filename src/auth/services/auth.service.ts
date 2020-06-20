import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoggedData } from '../domain/logged-data.interface';
import { map, tap } from 'rxjs/operators';
import { User } from '../../user/domain/user';
import { TokenData } from '../domain/token-data.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<TokenData> {
    const user = this.userService.findOne({ login: username });
    return user.pipe(
      tap(user => {
        if (user.passwordHash !== User.generateHash(password)) {
          throw new UnauthorizedException();
        }
      }),
      map(user => ({ username: user.login, sub: user.id })),
    ).toPromise();
  }

  async login(data: TokenData): Promise<LoggedData> {

    const token: string = await this.jwtService.signAsync(data);
    return {
      accessToken: token,
    };
  }
}
