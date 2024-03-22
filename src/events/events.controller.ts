import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './models/event.model';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
	constructor(private eventsService: EventsService) { }

	@Get()
	findAll(): Promise<Event[]> {
		return this.eventsService.findAll();
	}

	@Post()
	create(@Body() createUserDto: CreateEventDto): Promise<Event> {
		return this.eventsService.create(createUserDto);
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Event> {
		return this.eventsService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.eventsService.remove(id);
	}
}
