import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback } from './models/feedback.model';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Participant } from './../participants/models/participant.model';

@Injectable()
export class FeedbacksService {
	constructor(
		@InjectModel(Feedback)
		private readonly feedbackModel: typeof Feedback
	) { }

	findOne(id: string): Promise<Feedback> {
		return this.feedbackModel.findOne({
			where: {
				id
			}
		});
	}

	findOneIncludeParticipant(id: string): Promise<Feedback> {
		return this.feedbackModel.findOne({
			include: Participant,
			where: {
				id
			}
		});
	}

	findAll(): Promise<Feedback[]> {
		return this.feedbackModel.findAll();
	}

	async create(participantId: string, createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
		let feedback: any;
		try {
			feedback = await this.feedbackModel.create({
				participantId,
				...createFeedbackDto
			});
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}
		return feedback;
	}

	async update(id: string, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
		let eventFeedback = await this.feedbackModel.findOne({
			where: {
				id
			}
		});

		for (let key in updateFeedbackDto) {
			eventFeedback[key] = updateFeedbackDto[key];
		}

		try {
			await eventFeedback.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		return eventFeedback;
	}

	async remove(id: string): Promise<void> {
		const feedback = await this.findOne(id);
		await feedback.destroy();
	}

}
