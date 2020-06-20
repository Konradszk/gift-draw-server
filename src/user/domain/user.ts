import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EntityPartitionKey, EntityRowKey, EntityString } from '@nestjs/azure-database/dist';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { hashSync } from 'bcrypt';
import { NewUser } from './new-user';

export const PARTITION_KEY = 'UserID';
export const USER_ROW_KEY = 'UserKey';

@EntityPartitionKey(PARTITION_KEY)
@EntityRowKey(USER_ROW_KEY)
export class User {

  constructor(newUser: NewUser) {
    this.login = newUser.login;
    this.name = newUser.name
    this.passwordHash = newUser.passwordHash;
  }
  @EntityString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @EntityString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @EntityString()
  passwordHash: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @EntityString()
  name: string;

  public generateID(): void {
    this.id = randomStringGenerator();
  }

  public static generateHash(rawPassword: string) {
    return hashSync(rawPassword, 10);
  }
}
