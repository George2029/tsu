import { IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContestEventConfigDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@Type(() => Number)
	@IsInt()
	eventId: number;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	rules: string;

	@IsString()
	@IsNotEmpty()
	prize: string;
}
