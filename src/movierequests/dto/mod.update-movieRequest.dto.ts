import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { MovieRequestStatus } from './../enums/movieRequestStatus.enum';
import { IsOptional, IsString, IsEnum, IsDate, IsNotEmpty, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class ModUpdateMovieRequestDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	title?: string;

	@IsOptional()
	@IsUrl()
	URL?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	location?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsEnum(Subtitles)
	subtitlesSettings?: Subtitles;

	@IsOptional()
	@IsEnum(Audio)
	audioSettings?: Audio;

	@IsOptional()
	@IsEnum(MovieRequestStatus)
	status?: MovieRequestStatus;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	startTime?: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	endTime?: Date;
}
