import { ParticipantStatus } from './../enums/participantStatus.enum';

export class CreateParticipantDto {
	status: ParticipantStatus;
	notified: boolean;
}
