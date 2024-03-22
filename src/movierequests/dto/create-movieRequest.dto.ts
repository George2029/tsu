import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { RequestStatus } from './../enums/requestStatus.enum';

export class CreateMovieRequestDto {
	title: string;
	URL: string;
	location: string;
	description: string | null;
	subtitlesSettings: Subtitles;
	audioSettings: Audio;
	status: RequestStatus;
	startTime: Date;
	endTime: Date;
}
