import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { User } from './../users/models/user.entity';
import { ParticipantStatus } from './enums/participantStatus.enum';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from './models/participant.entity';
import { Event } from './../events/models/event.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Injectable()
export class ParticipantsService {
	constructor(
		@InjectModel(Participant)
		private readonly participantModel: typeof Participant,
	) { }

	countAllGoingByEventId(eventId: number): Promise<number> {
		return this.participantModel.count({
			where: {
				eventId,
				status: {
					[Op.not]: [ParticipantStatus.HASCANCELED]
				}
			}
		});
	}

	async findOne(id: number): Promise<Participant> {
		let participant = await this.participantModel.findOne({
			where: {
				id
			}
		});
		if (!participant) throw new NotFoundException('participant not found');
		return participant;
	}

	findAllUserParticipations(id: number): Promise<Participant[]> {
		return this.participantModel.findAll({
			where: {
				userId: id
			},
			include: {
				model: Event,
				attributes: ['title', 'startTime'],
			},
			raw: true,
			nest: true
		});
	}

	async findAllByEventId(eventId: number): Promise<Participant[]> {
		return this.participantModel.findAll({
			include: {
				model: User,
				attributes: ['hue', 'username', 'firstName']
			},
			where: {
				eventId,
				status: {
					[Op.not]: [ParticipantStatus.HASCANCELED]
				}
			},
			raw: true,
			nest: true
		});
	}

	async findOneByUserIdAndEventId(userId: number, eventId: number): Promise<Participant> {
		let participant = await this.participantModel.findOne({
			where: {
				userId,
				eventId,
			}
		});
		if (!participant) throw new NotFoundException();
		return participant;
	}

	async create(userId: number, createParticipantDto: CreateParticipantDto): Promise<Participant> {
		let participant: any;
		try {
			participant = await this.participantModel.create({
				userId,
				...createParticipantDto
			});
		} catch (error) {
			throw new ConflictException(error.name);
		}
		return participant;
	}

	async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
		let participant = await this.findOne(id);
		if (!participant) throw new NotFoundException();

		for (let key in updateParticipantDto) {
			participant[key] = updateParticipantDto[key]
		}

		try {
			await participant.save();
		} catch (error) {
			console.log(error);
			let err = error.errors.message.toString();
			throw new ConflictException(err ? err : error.name);
		}

		return participant;
	}

	async remove(id: number): Promise<void> {
		const participant = await this.findOne(id);
		if (!participant) throw new NotFoundException();
		await participant.destroy();
	}


}
