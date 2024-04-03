import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
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

	async findOne(id: number): Promise<Feedback> {
		let feedback = await this.feedbackModel.findOne({
			where: {
				id
			}
		});
		if (!feedback) throw new NotFoundException();
		return feedback;
	}

	findOneIncludeParticipant(id: number): Promise<Feedback> {
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

	async create(participantId: number, createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
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

	async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
		let feedback = await this.findOne(id);

		for (let key in updateFeedbackDto) {
			feedback[key] = updateFeedbackDto[key];
		}

		try {
			await feedback.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		return feedback;
	}

	async remove(id: number): Promise<void> {
		const feedback = await this.findOne(id);
		await feedback.destroy();
	}

}
