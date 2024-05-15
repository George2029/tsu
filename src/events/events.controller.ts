import { Controller, Get, Param, ParseIntPipe, Query, ParseEnumPipe } from '@nestjs/common';
import { EventType } from './enums/eventType.enum';
import { EventsService } from './events.service';
import { Event } from './models/event.entity';

@Controller('events')
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
	) { }

	@Get()
	findAll(@Query('type', new ParseEnumPipe(EventType, { optional: true })) type?: EventType, @Query('offset', new ParseIntPipe({ optional: true })) offset?: number): Promise<Event[]> {
		console.log(`offset: `, offset);

		return this.eventsService.findAll({ type, offset });
	}

	@Get(':eventId')
	findOne(
		@Param('eventId', ParseIntPipe) eventId: number
	): Promise<Event> {
		return this.eventsService.findOne(eventId);
	}


}
