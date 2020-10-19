import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { from, Observable } from 'rxjs';
import { NewUser } from '../domain/new-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }


  public findOne(data: { login: string }): Observable<User> {
    return from(this.userRepository.findOne({where: {login: data.login}}));
  }

  // @ts-ignore
  public async register(userData: NewUser): Observable<User> {
    await this.validateNewUser(userData.login);
    const user = new User(userData);
    user.generateID();
    return from(this.userRepository.insert(user)).pipe(map( u => u.raw));
  }

  private async validateNewUser(login: string) {
    const user: User = await this.findOne({ login }).toPromise();
    if (!user) {
      throw new BadRequestException('Login taken');
    }
  }
}
