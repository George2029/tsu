import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

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

	@Get('/movies')
	findAllMovieEvents(): Promise<Event[]> {
		return this.eventsService.findAllMovieEvents();
	}

	@Get('/boardgames')
	findAllBoardGameEvents(): Promise<Event[]> {
		return this.eventsService.findAllBoardGameEvents();
	}

	@Get('/contests')
	findAllContestEvents(): Promise<Event[]> {
		return this.eventsService.findAllContestEvents();
	}

	@Get('/custom')
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
