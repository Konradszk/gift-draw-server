import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.interface';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {

  testUsers: User[] = [
    { name: 'testName', login: 'test', password: hashSync('pass', 10) },
  ];

  public findOne(username: string): User {
    return this.testUsers.find(user => user.login === username);
  }
}
