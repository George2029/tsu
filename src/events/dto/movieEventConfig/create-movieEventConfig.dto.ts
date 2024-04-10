import { Audio } from './../../enums/audio.enum';
import { Subtitles } from './../../enums/subtitles.enum';
import { Type } from 'class-transformer';

import { IsString, IsOptional, IsUrl, IsEnum, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMovieEventConfigDto {

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
	duration: string;

	@IsUrl()
	url: string;

	@IsEnum(Audio)
	audio: Audio = Audio.NATIVE;

	@IsEnum(Subtitles)
	subtitles: Subtitles = Subtitles.RUSSIAN;
}
