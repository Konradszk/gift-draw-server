import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Participant } from './participant.entity';

@Entity({ schema: 'dbo' })
export class Draw {
  constructor(id?: number, name?: string, secret?: string, finishDate?: Date, participants?: Participant[]) {
    this.id = id;
    this.name = name;
    this.secret = secret;
    this.finishDate = finishDate;
    this.participants = participants;
  }


  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Column('varchar', { nullable: false, length: 50 })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { nullable: false, length: 50 })
  secret: string;

  @Column('smalldatetime', { nullable: false })
  finishDate: Date;

  @ManyToMany(() => Participant, p => p.draws, {cascade:  ['insert', 'update']})
  @JoinTable({name: 'participant'})
  public participants: Participant[];

  static fromDto(data: any): Draw {
    const entity = new Draw();
    entity.participants = [];
    for (let key in entity) {
      if (entity.hasOwnProperty(key) && !Array.isArray(data[key])) {
        entity[key] = data.hasOwnProperty(key) ? data[key] : undefined;
      }
    }
    if (data && data.hasOwnProperty('participants') && Array.isArray(data.participants)) {
      data.participants.forEach(p => {
        entity.participants.push(Participant.fromDto(p)); // todo check
      });
    }
    return entity;
  }
}
