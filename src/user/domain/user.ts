import { hash } from 'bcrypt';
import {User as IUser} from './user.interface';

export class User implements IUser{
  public login: string;
  public password: string;
  public name: string;

  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
