import { Controller, Post, Body, Delete, Param, Put } from '@nestjs/common';

import { EventsService } from './events.service';

import { Event } from './models/event.model';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { Roles } from './../roles.decorator';
import { UserRole } from './../users/enums/userRole.enum';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/events')
export class ModEventsController {
	constructor(
		private readonly eventsService: EventsService,
	) { }

	@Post()
	create(@Body() createEventDto: CreateEventDto): Promise<Event> {
		return this.eventsService.create(createEventDto);
	}

	@Put(':id')
	update(@Body() updateEventDto: UpdateEventDto, @Param('id') id: string): Promise<Event> {
		return this.eventsService.update(id, updateEventDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.eventsService.remove(id);
	}

}
