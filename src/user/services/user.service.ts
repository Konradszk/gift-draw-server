import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { NewUser } from '../domain/new-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }

  public register(userData: NewUser): Observable<User> {
    return this.validateNewUser(userData.login).pipe(
      switchMap(() => of(new User(userData))),
      switchMap(async (user: User) => await this.userRepository.save(user)),
    );
  }

  public findOne(data: { login: string }): Observable<User> {
    return from(this.userRepository.findOne({ where: { login: data.login } }));
  }



  private validateNewUser(login: string): Observable<User> {
    return this.findOne({ login }).pipe(tap(user => {
      if (user) {
        throw new BadRequestException('Login taken');
      }
    }));

  }
}
