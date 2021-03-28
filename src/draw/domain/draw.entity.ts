import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from './match.entity';
import { User } from '../../user/domain/user.entity';

@Entity({ schema: 'dbo' })
export class Draw {
  constructor(id?: number, name?: string, secret?: string, finishDate?: Date, matches?: Match[]) {
    this.id = id;
    this.name = name;
    this.secret = secret;
    this.finishDate = finishDate;
    this.matches = matches;
  }


  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Column('varchar', { nullable: false, length: 50 })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Column('varchar', { nullable: false, length: 50 })
  public secret: string;

  @Column('smalldatetime', { nullable: false })
  public finishDate: Date;

  @OneToMany(() => Match, m => m.draw)
  @JoinTable({ name: 'match' })
  public matches: Array<Match>;

  @ManyToOne(() => User, u => u.drawList)
  @JoinColumn({ name: 'owner' })
  public owner: User;

  static fromDto(data: any): Draw {
    const entity = new Draw();
    for (let key in entity) {
      if (entity.hasOwnProperty(key) && !Array.isArray(data[key])) {
        entity[key] = data.hasOwnProperty(key) ? data[key] : undefined;
      }
    }
    return entity;
  }
}
