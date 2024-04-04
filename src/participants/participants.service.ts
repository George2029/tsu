import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from './models/participant.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
	constructor(
		@InjectModel(Participant)
		private readonly participantModel: typeof Participant,
	) { }

	async findOne(id: number): Promise<Participant> {
		let participant = await this.participantModel.findOne({
			where: {
				id
			}
		});
		if (!participant) throw new NotFoundException('participant not found');
		return participant;
	}

	findAll(): Promise<Participant[]> {
		return this.participantModel.findAll();
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

	async create(userId: number, eventId: number): Promise<Participant> {
		let participant: any;
		try {
			participant = await this.participantModel.create({
				userId,
				eventId,
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
			throw new ConflictException(error.name);
		}

		return participant;
	}

	async remove(id: number): Promise<void> {
		const participant = await this.findOne(id);
		if (!participant) throw new NotFoundException();
		await participant.destroy();
	}


}
