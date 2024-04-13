import { Get, Param, Controller, ParseIntPipe, ParseEnumPipe } from '@nestjs/common';
import { EventType } from './enums/eventType.enum';
import { CustomEventConfigsService } from './customEventConfigs.service';
import { MovieEventConfigsService } from './movieEventConfigs.service';
import { BoardGamesEventConfigsService } from './boardGamesEventConfigs.service';
import { ContestEventConfigsService } from './contestEventConfigs.service';

@Controller('configs')
export class ConfigsController {
	constructor(
		private readonly customConfigsService: CustomEventConfigsService,
		private readonly movieEventConfigsService: MovieEventConfigsService,
		private readonly boardGamesEventConfigsService: BoardGamesEventConfigsService,
		private readonly contestEventConfigsService: ContestEventConfigsService,
	) { }

	@Get(':eventId/:type')
	findAllConfigsByEventIdAndEventType(
		@Param('eventId', ParseIntPipe) eventId: number,
		@Param('type', new ParseEnumPipe(EventType)) type: EventType
	): Promise<any> {
		switch (type) {
			case EventType.CUSTOM_EVENT:
				return this.customConfigsService.findAllByEventId(eventId)
			case EventType.MOVIE_EVENT:
				return this.movieEventConfigsService.findAllByEventId(eventId)
			case EventType.BOARD_GAMES_EVENT:
				return this.boardGamesEventConfigsService.findAllByEventId(eventId)
			case EventType.CONTEST_EVENT:
				return this.contestEventConfigsService.findAllByEventId(eventId)
		}
	}
}
