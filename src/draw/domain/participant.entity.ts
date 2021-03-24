import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Draw } from './draw.entity';

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

  @ManyToMany(()=> Draw, d => d.participants)
  draws:Draw[];

  static fromDto(name: string){
    return new Participant(undefined, name);
  }
}
