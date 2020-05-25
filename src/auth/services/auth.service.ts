import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { TokenData } from '../domain/token-data.interface';
import { hash, hashSync } from 'bcrypt';
import { of } from 'rxjs';

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

  async login(user: TokenData) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }
}
