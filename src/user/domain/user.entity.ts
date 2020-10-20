import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { hashSync } from 'bcrypt';
import { NewUser } from './new-user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbo'})
export class User {

  constructor(newUser: NewUser) {
    this.login = newUser?.login;
    this.name = newUser?.name;
    this.passwordHash = newUser?.passwordHash;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Column('varchar',{ unique: true, length: 50 })
  login: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar',{ unique: true, length: 'MAX' })
  passwordHash: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Column('varchar',{ unique: true, length: 50 })
  name: string;

  public static generateHash(rawPassword: string) {
    return hashSync(rawPassword, 10);
  }
}
