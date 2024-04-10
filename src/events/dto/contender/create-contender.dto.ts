import { IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContenderDto {

	@Type(() => Number)
	@IsInt()
	participantId: number;

	@Type(() => Number)
	@IsInt()
	contestEventConfigId: number;

	@IsBoolean()
	winner: boolean;
}
