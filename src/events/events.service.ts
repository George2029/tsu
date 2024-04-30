import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './models/event.entity';
import { EventType } from './enums/eventType.enum';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
	constructor(
		@InjectModel(Event)
		private readonly eventModel: typeof Event,
	) { }

	async findAll(): Promise<Event[]> {
		return this.eventModel.scope('preview').findAll();
	}

	async findAllMovieEvents(): Promise<Event[]> {
		return this.eventModel.scope('preview').findAll({
			where: {
				type: EventType.MOVIE_EVENT
			}
		});
	}

	async findAllBoardGameEvents(): Promise<Event[]> {
		return this.eventModel.scope('preview').findAll({
			where: {
				type: EventType.BOARD_GAMES_EVENT
			}
		});
	}

	async findAllContestEvents(): Promise<Event[]> {
		return this.eventModel.scope('preview').findAll({
			where: {
				type: EventType.CONTEST_EVENT
			}
		});
	}

	async findAllCustomEvents(): Promise<Event[]> {
		return this.eventModel.scope('preview').findAll({
			where: {
				type: EventType.CUSTOM_EVENT
			}
		});
	}


	create(userId: number, createEventDto: CreateEventDto): Promise<Event> {
		console.log(createEventDto);

		let {
			title,
			type,
			location,
			description,
			placesTotal,
			startTime,
			endTime,
		} = createEventDto;

		return this.eventModel.create({
			title,
			type,
			location,
			userId,
			description,
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
		});

		if (!event) throw new NotFoundException('event not found');

		return event;
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
