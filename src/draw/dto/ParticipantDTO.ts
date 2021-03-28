import { Participant } from '../domain/participant.entity';

export class ParticipantDTO {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDomain(participants: Participant[]): ParticipantDTO[] {
    return participants.map(p => new ParticipantDTO(p.id, p.name));
  }
}
