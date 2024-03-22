import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventFeedbackDto } from './dto/create-eventFeedback.dto';
import { EventFeedback } from './models/eventFeedback.model';

@Injectable()
export class EventFeedbacksService {
	constructor(
		@InjectModel(EventFeedback)
		private readonly eventFeedbackModel: typeof EventFeedback,
	) { }

	create(createEventFeedbackDto: CreateEventFeedbackDto): Promise<EventFeedback> {
		return this.eventFeedbackModel.create({
			review: createEventFeedbackDto.review,
			rating: createEventFeedbackDto.rating
		});
	}

	async findAll(): Promise<EventFeedback[]> {
		return this.eventFeedbackModel.findAll();
	}

	findOne(id: string): Promise<EventFeedback> {
		return this.eventFeedbackModel.findOne({
			where: {
				id,
			},
		});
	}

	async remove(id: string): Promise<void> {
		const eventFeedback = await this.findOne(id);
		await eventFeedback.destroy();
	}
}
