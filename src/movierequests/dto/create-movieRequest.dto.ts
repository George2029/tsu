import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { IsOptional, IsString, IsEnum, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMovieRequestDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsUrl()
	URL: string;

	@IsNotEmpty()
	@IsString()
	location: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsEnum(Subtitles)
	subtitlesSettings: Subtitles;

	@IsEnum(Audio)
	audioSettings: Audio;
}
