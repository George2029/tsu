import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomEventConfigDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description: string;

	@Type(() => Number)
	@IsInt()
	eventId: number;
}
