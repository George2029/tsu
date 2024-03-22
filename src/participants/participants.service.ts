import { Injectable } from '@nestjs/common';
import { Participant } from './models/participant.model';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ParticipantsService {
	constructor(
		@InjectModel(Participant)
		private readonly participantModel: typeof Participant,
	) { }

	create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
		return this.participantModel.create({
			status: createParticipantDto.status,
			notified: createParticipantDto.notified
		})
	}

	async findAll(): Promise<Participant[]> {
		return this.participantModel.findAll();
	}

	findOne(id: string): Promise<Participant> {
		return this.participantModel.findOne({
			where: {
				id
			}
		});
	}

	async remove(id: string): Promise<void> {
		const participant = await this.findOne(id);
		await participant.destroy();
	}


}
