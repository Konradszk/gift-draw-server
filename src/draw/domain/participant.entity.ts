import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from './match.entity';

@Entity({ schema: 'dbo' })
export class Participant {
  constructor(id?: number, name?: string, userId?: number) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Column('varchar', { nullable: false, length: 50 })
  name: string;

  @Column('int')
  userId: number;

  @OneToMany(() => Match, m => m.participant)
  matches: Array<Match>;

  static fromDto(name: string) {
    return new Participant(undefined, name);
  }

  static fromList(names: string[]): Participant[] {
    return names.map(name => this.fromDto(name));
  }
}
