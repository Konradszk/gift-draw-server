import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/LoginDTO';
import { SignUpDTO } from '../dto/SignUpDTO';
import { UserService } from '../../user/services/user.service';
import { TokenData } from '../domain/token-data.interface';
import { generateHash } from '../../user/domain/user.entity';
import { first, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  public async login(data: LoginDTO): Promise<string> {
    const payload: TokenData = await this.authService.validateUser(data.login, data.password);
    const token = await this.authService.login(payload);
    return token.accessToken;
  }

  public signUpUser(dto: SignUpDTO): Observable<any> {
    const passwordHash: string = generateHash(dto.password);
    return this.userService.register({ ...dto, passwordHash }).pipe(
      first(),
      mergeMap(async user => ({
        token: await this.authService.login({ username: user.name, sub: user.id.toString() }),
        user,
      })),
      map(({ token, user }) => ({
        ...user,
        accessToken: token.accessToken,
      })),
    );
  }
}
