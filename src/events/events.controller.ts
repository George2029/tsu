import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { EventsService } from './events.service';
import { Event } from './models/event.model';

import { Participant } from './../participants/models/participant.model';

import { Feedback } from './../feedbacks/models/feedback.model';


@Controller('events')
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
	) { }

	@Get()
	findAll(): Promise<Event[]> {
		return this.eventsService.findAll();
	}

	@Get(':eventId')
	findOne(
		@Param('eventId', ParseIntPipe) eventId: number
	): Promise<Event> {
		return this.eventsService.findOne(eventId);
	}

	@Get(':eventId/participants')
	findAllEventParticipants(
		@Param('eventId', ParseIntPipe) eventId: number
	): Promise<Participant[]> {
		return this.eventsService.findEventParticipants(eventId);
	}

	@Get(':eventId/feedbacks')
	findAllEventFeedbacks(
		@Param('eventId', ParseIntPipe) eventId: number
	): Promise<Feedback[]> {
		return this.eventsService.findEventFeedbacks(eventId);
	}


}
