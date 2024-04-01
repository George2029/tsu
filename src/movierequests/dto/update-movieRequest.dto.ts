import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { MovieRequestStatus } from './../enums/movieRequestStatus.enum';
import { IsOptional, IsString, IsEnum, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateMovieRequestDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	title?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
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
	@IsDate()
	startTime?: Date;

	@IsOptional()
	@IsDate()
	endTime?: Date;
}
