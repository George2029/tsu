import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './models/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Participant } from './../participants/models/participant.entity';
import { Feedback } from './../feedbacks/models/feedback.entity';
import { CustomEventConfig } from './models/customEventConfig.entity';
import { MovieEventConfig } from './models/movieEventConfig.entity';
import { ContestEventConfig } from './models/contestEventConfig.entity';
import { BoardGamesEventConfig } from './models/boardGamesEventConfig.entity';

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
		console.log(createEventDto);

		let {
			title,
			type,
			location,
			description,
			moderator,
			placesTotal,
			startTime,
			endTime,
		} = createEventDto;

		return this.eventModel.create({
			title,
			type,
			location,
			description,
			moderator,
			placesTotal,
			startTime: new Date(startTime),
			endTime: new Date(endTime),
		});
	}

	async findOne(id: number): Promise<Event> {
		let event = await this.eventModel.findOne({
			where: {
				id,
			},
			include: [CustomEventConfig, MovieEventConfig, BoardGamesEventConfig, ContestEventConfig],
		});

		if (!event) throw new NotFoundException('event not found');

		return event;
	}

	async findEventParticipants(id: number): Promise<Participant[]> {
		let event = await this.eventModel.findOne({
			include: Participant,
			where: {
				id,
			}
		});
		if (!event) throw new NotFoundException();
		return event.participants;
	}

	async findEventFeedbacks(id: number): Promise<Feedback[]> {
		let event = await this.eventModel.findOne({
			include: Feedback,
			where: {
				id,
			}
		});
		if (!event) throw new NotFoundException();
		return event.feedbacks;
	}

	async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {

		const event = await this.eventModel.findOne({ where: { id } });
		if (event) {
			for (const key in updateEventDto) {
				event[key] = updateEventDto[key];
			}
		}

		try {
			await event.save();
		} catch (error) {
			throw new ConflictException(error.name);
		}

		return event;
	}

	async remove(id: number): Promise<void> {
		const user = await this.findOne(id);
		await user.destroy();
	}
}
