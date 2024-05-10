import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EventType } from './enums/eventType.enum';
import { EventsService } from './events.service';
import { Event } from './models/event.entity';

@Controller('events')
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
	) { }

	@Get()
	findAll(): Promise<Event[]> {
		return this.eventsService.findAll();
	}

	@Get(EventType.MOVIE_EVENT)
	findAllMovieEvents(): Promise<Event[]> {
		return this.eventsService.findAllMovieEvents();
	}

	@Get(EventType.BOARD_GAMES_EVENT)
	findAllBoardGameEvents(): Promise<Event[]> {
		return this.eventsService.findAllBoardGameEvents();
	}

	@Get(EventType.CONTEST_EVENT)
	findAllContestEvents(): Promise<Event[]> {
		return this.eventsService.findAllContestEvents();
	}

	@Get(EventType.CUSTOM_EVENT)
	findAllCustomEvents(): Promise<Event[]> {
		return this.eventsService.findAllCustomEvents();
	}

	@Get(':eventId')
	findOne(
		@Param('eventId', ParseIntPipe) eventId: number
	): Promise<Event> {
		return this.eventsService.findOne(eventId);
	}


}
