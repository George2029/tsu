import { IsBoolean, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateParticipantDto {
	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean()
	notified?: boolean;

	@Type(() => Number)
	@IsInt()
	eventId: number;
}
