import { IsOptional, IsEnum } from 'class-validator';
import { ParticipantStatus } from './../../participants/enums/participantStatus.enum';

export class ModUpdateParticipantDto {
	@IsOptional()
	@IsEnum(ParticipantStatus)
	status: ParticipantStatus;
}
