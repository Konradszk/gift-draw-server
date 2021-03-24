import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Participant } from './participant.entity';
import { Draw } from './draw.entity';

@Entity({ schema: 'dbo' })
export class Match {

  @PrimaryColumn()
  id_participant: number;

  @PrimaryColumn()
  id_draw: number;

  @Column()
  chosen_participant: number;

  @ManyToOne(() => Participant, p => p.id)
  @JoinColumn({ name: 'id_participant' })
  participant: Participant;

  @ManyToOne(() => Draw, d => d.id)
  @JoinColumn({ name: 'id_draw' })
  draw: Draw;

  @ManyToOne(() => Participant, p => p.id)
  @JoinColumn({ name: 'chosen_participant' })
  chosenParticipant: Participant;
}
