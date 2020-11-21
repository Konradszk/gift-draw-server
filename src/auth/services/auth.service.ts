import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoggedData } from '../domain/logged-data.interface';
import { map, tap } from 'rxjs/operators';
import { TokenData } from '../domain/token-data.interface';
import { compareSync } from 'bcrypt';

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
        if (!user || !user.passwordHash || !compareSync(password, user.passwordHash)) {
          throw new BadRequestException();
        }
      }),
      map(user => ({ username: user.login, sub: user.id.toString() })),
    ).toPromise();
  }

  async login(data: TokenData): Promise<LoggedData> {

    const token: string = await this.jwtService.signAsync(data);
    return {
      accessToken: token,
    };
  }
}
