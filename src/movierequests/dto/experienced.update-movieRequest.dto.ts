import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { IsOptional, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class ExperiencedUpdateMovieRequestDto {
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

}
