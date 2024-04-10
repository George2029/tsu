import { EventStatus } from './../enums/eventStatus.enum';

import { IsOptional, IsString, IsInt, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	location: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	moderator: string;

	@IsOptional()
	@IsInt()
	placesTotal: number;

	@IsOptional()
	@IsEnum(EventStatus)
	status: EventStatus;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	startTime: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	endTime: Date;
}

