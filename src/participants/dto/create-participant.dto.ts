import { IsBoolean } from 'class-validator';

export class CreateParticipantDto {
	@IsBoolean()
	notified: boolean;
}
