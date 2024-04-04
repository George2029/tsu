import { IsBoolean, IsOptional } from 'class-validator';

export class CreateParticipantDto {
	@IsOptional()
	@IsBoolean()
	notified?: boolean;
}
