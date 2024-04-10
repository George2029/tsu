import { IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVoteDto {
	@Type(() => Number)
	@IsInt()
	requestId: number;

	@IsBoolean()
	value: boolean;
}
