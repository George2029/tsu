import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { EventStatus } from './../enums/eventStatus.enum';

export class CreateEventDto {
	title: string;
	location: string;
	description: string | null;
	moderator: string;
	placesTotal: number;
	subtitlesSettings: Subtitles;
	audioSettings: Audio;
	status: EventStatus;
	startTime: Date;
	endTime: Date;
	rating: number | null;
}
