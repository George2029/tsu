import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from './models/participant.model';
import { ParticipantStatus } from './enums/participantStatus.enum';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
	constructor(
		@InjectModel(Participant)
		private readonly participantModel: typeof Participant,
	) { }

	findOne(id: string): Promise<Participant> {
		return this.participantModel.findOne({
			where: {
				id
			}
		});
	}

	findAll(): Promise<Participant[]> {
		return this.participantModel.findAll();
	}

	findOneByUserIdAndEventId(userId: string, eventId: string): Promise<Participant> {
		return this.participantModel.findOne({
			where: {
				userId,
				eventId,
			}
		});
	}

	async create(userId: string, eventId: string, createParticipantDto: CreateParticipantDto): Promise<Participant> {
		let participant: any;
		try {
			participant = await this.participantModel.create({
				userId,
				eventId,
				status: ParticipantStatus.ISGOING,
				notified: createParticipantDto.notified,
			});
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}
		return participant;
	}

	async update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
		let participant = await this.findOne(id);

		for (let key in updateParticipantDto) {
			participant[key] = updateParticipantDto[key]
		}

		try {
			await participant.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		return participant;
	}

	async remove(id: string): Promise<void> {
		const participant = await this.findOne(id);
		await participant.destroy();
	}


}
