import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBoardGamesEventConfigDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@Type(() => Number)
	@IsInt()
	eventId: number;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	description: string;

	@IsInt()
	maxPlayers: number;
}
