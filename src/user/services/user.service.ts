import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database/dist';
import { User, USER_ROW_KEY } from '../domain/user';
import { from, Observable } from 'rxjs';
import { NewUser } from '../domain/new-user';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }



  public findOne(data: { login: string }): Observable<User> {
    return from(this.userRepository.find(USER_ROW_KEY, {login: data.login}));
  }

  public register(userData: NewUser): Observable<User> {
    const user = new User(userData);
    user.generateID();
    return from(this.userRepository.create(user));
  }
}
