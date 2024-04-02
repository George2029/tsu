import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';

import { IsOptional, IsString, IsInt, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	@IsString()
	location: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsString()
	@IsNotEmpty()
	moderator: string;

	@IsInt()
	placesTotal: number;

	@IsEnum(Subtitles)
	subtitlesSettings: Subtitles;

	@IsEnum(Audio)
	audioSettings: Audio;

	@IsDate()
	@Type(() => Date)
	startTime: Date;

	@IsDate()
	@Type(() => Date)
	endTime: Date;
}
