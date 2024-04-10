import { IsOptional, IsString, IsInt, IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from './../enums/eventType.enum';

export class CreateEventDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsEnum(EventType)
	type: EventType;

	@IsNotEmpty()
	@IsString()
	location: string = 'TSU the 12th building, 3rd floor, TISP, 22 room';

	@IsOptional()
	@IsString()
	description?: string;

	@IsString()
	@IsNotEmpty()
	moderator: string;

	@IsInt()
	placesTotal: number = 10;

	@IsDate()
	@Type(() => Date)
	startTime: Date;

	@IsDate()
	@Type(() => Date)
	endTime: Date;
}
