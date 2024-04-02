import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './models/event.model';
import { EventStatus } from './enums/eventStatus.enum';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Participant } from './../participants/models/participant.model';
import { Feedback } from './../feedbacks/models/feedback.model';

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
		return this.eventModel.create({
			title: createEventDto.title,
			location: createEventDto.location,
			description: createEventDto.description,
			moderator: createEventDto.moderator,
			placesTotal: createEventDto.placesTotal,
			subtitlesSettings: createEventDto.subtitlesSettings,
			audioSettings: createEventDto.audioSettings,
			status: EventStatus.NOTPASSED,
			startTime: new Date(createEventDto.startTime),
			endTime: new Date(createEventDto.endTime),
		});
	}

	async findOne(id: number): Promise<Event> {
		let event = await this.eventModel.findOne({
			where: {
				id,
			},
		});

		if (!event) throw new NotFoundException();

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
			throw new ConflictException(error.errors[0].message);
		}

		return event;
	}

	async remove(id: number): Promise<void> {
		const user = await this.findOne(id);
		await user.destroy();
	}
}
