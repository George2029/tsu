import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { EventFeedbacksService } from './eventfeedbacks.service';
import { EventFeedback } from './models/eventFeedback.model';
import { CreateEventFeedbackDto } from './dto/create-eventFeedback.dto';

@Controller('eventfeedbacks')
export class EventFeedbacksController {
	constructor(private readonly eventFeedbacksService: EventFeedbacksService) { }

	@Post()
	create(@Body() createEventFeedbackDto: CreateEventFeedbackDto): Promise<EventFeedback> {
		return this.eventFeedbacksService.create(createEventFeedbackDto);
	}

	@Get()
	findAll(): Promise<EventFeedback[]> {
		return this.eventFeedbacksService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<EventFeedback> {
		return this.eventFeedbacksService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.eventFeedbacksService.remove(id);
	}
}
