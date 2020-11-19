import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { genSaltSync, hashSync } from 'bcrypt';
import { NewUser } from './new-user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbo' })
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
  @Column('varchar', { unique: true, length: 50 })
  login: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { unique: true, length: 'MAX' })
  passwordHash: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Column('varchar', { unique: true, length: 50 })
  name: string;


}

export function generateHash(rawPassword: string) {
  const salt = genSaltSync(+process.env.SALT_ROUNDS);
  return hashSync(rawPassword, salt);
}
