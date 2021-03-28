import { Participant } from '../domain/participant.entity';
import { Draw } from '../domain/draw.entity';
import { ParticipantDTO } from './ParticipantDTO';

export class DrawDTO {

  id: number;
  name: string;
  participants: ParticipantDTO[];
  finishDate: Date;


  constructor(id: number, name: string, participants: ParticipantDTO[], finishDate: Date) {
    this.id = id;
    this.name = name;
    this.participants = participants;
    this.finishDate = finishDate;
  }

  static fromDomain(participants: Participant[], draw: Draw): DrawDTO {
    return new DrawDTO(
      draw.id,
      draw.name,
      ParticipantDTO.fromDomain(participants),
      draw.finishDate,
    );
  }
}
