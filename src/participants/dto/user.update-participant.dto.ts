import { IsOptional, IsBoolean, IsIn } from 'class-validator';
import { ParticipantStatus } from './../../participants/enums/participantStatus.enum';

export class UserUpdateParticipantDto {
	@IsOptional()
	@IsIn([ParticipantStatus.ISGOING, ParticipantStatus.HASCANCELED])
	status: ParticipantStatus;

	@IsOptional()
	@IsBoolean()
	notified: boolean;
}
