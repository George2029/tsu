import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './models/event.model';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
	constructor(
		@InjectModel(Event)
		private readonly eventModel: typeof Event,
	) { }

	async findAll(): Promise<Event[]> {
		return this.eventModel.findAll();
	}

	create(createEventDto: CreateEventDto): Promise<Event> {
		return this.eventModel.create({
			title: createEventDto.title,
			location: createEventDto.location,
			description: createEventDto.description,
			moderator: createEventDto.moderator,
			placesTotal: createEventDto.placesTotal,
			subtitlesSettings: createEventDto.subtitlesSettings,
			audioSettings: createEventDto.audioSettings,
			status: createEventDto.status,
			startTime: createEventDto.startTime,
			endTime: createEventDto.endTime,
			rating: createEventDto.rating
		});
	}

	findOne(id: string): Promise<Event> {
		return this.eventModel.findOne({
			where: {
				id,
			},
		});
	}

	async remove(id: string): Promise<void> {
		const user = await this.findOne(id);
		await user.destroy();
	}
}
