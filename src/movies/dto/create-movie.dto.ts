import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	language: string;

	@IsString()
	@IsNotEmpty()
	URL: string;

	@IsDate()
	duration: Date;
}
