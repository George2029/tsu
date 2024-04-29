import { EventStatus } from './../enums/eventStatus.enum';

import { IsOptional, IsString, IsInt, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from './../enums/eventType.enum';

export class UpdateEventDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	title?: string;

	@IsOptional()
	@IsEnum(EventType)
	type?: EventType;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	location?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description?: string | null;

	@IsOptional()
	@IsInt()
	placesTotal?: number;

	@IsOptional()
	@IsEnum(EventStatus)
	status?: EventStatus;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	startTime?: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	endTime?: Date;
}

