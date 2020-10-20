import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { NewUser } from '../domain/new-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }

  public async register(userData: NewUser): Promise<User> {
    await this.validateNewUser(userData.login);
    const user = new User(userData);
    return this.userRepository.save(user);
  }

  public async findOne(data: { login: string }): Promise<User> {
    return this.userRepository.findOne({ where: { login: data.login } });
  }


  private async validateNewUser(login: string) {
    const user: User = await this.findOne({ login });
    if (user) {
      throw new BadRequestException('Login taken');
    }
    return user;
  }
}
