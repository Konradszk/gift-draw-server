import { Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { Participant } from './participant.entity';
import { Draw } from './draw.entity';

@Entity({ schema: 'dbo' })
export class Match {

  constructor(
              participant?: Participant,
              draw?: Draw,
              chosenParticipant?: Participant) {


    this.participant = participant;
    this.draw = draw;
    this.chosenParticipant = chosenParticipant;
  }

  @ManyToOne(() => Participant, p => p.matches, {primary: true, eager: true})
  @JoinColumn({ name: 'id_participant' })
  @JoinTable({name: 'participant'})
  participant: Participant;

  @ManyToOne(() => Draw, d => d.matches, {primary: true})
  @JoinColumn({ name: 'id_draw'  })
  @JoinTable({name: 'draw'})
  draw: Draw;

  @ManyToOne(() => Participant, p => p.id, { eager: true, nullable: true})
  @JoinColumn({name: 'chosen_participant'})
  @JoinTable({name: 'participant'})
  chosenParticipant: Participant;

  static fromParticipantsAndDraw(participants: Participant[], draw: Draw): Match[] {
    return participants.map(p => new Match(new Participant(p.id), new Draw(draw.id)))
  }
}
