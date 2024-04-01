import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ParticipantStatus } from './../enums/participantStatus.enum';

export class UpdateParticipantDto {
	@IsOptional()
	@IsEnum(ParticipantStatus)
	status?: ParticipantStatus;

	@IsOptional()
	@IsBoolean()
	notified?: boolean;
}
