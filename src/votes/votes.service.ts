import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Vote } from './models/vote.entity';
import { User } from './../users/models/user.entity';

@Injectable()
export class VotesService {
	constructor(
		@InjectModel(Vote)
		private readonly voteModel: typeof Vote
	) { }

	async findVoteByRequestId(userId: number, requestId: number): Promise<Vote> {
		let vote = await this.voteModel.findOne({
			where: {
				userId,
				requestId
			},
			attributes: ['value'],
			raw: true
		});
		if (!vote) throw new NotFoundException();
		return vote;
	}

	async countAllByRequestId(requestId: number) {
		return this.voteModel.count({
			where: {
				requestId,
			},
		});
	}

	async countAllNoByRequestId(requestId: number) {
		return this.voteModel.count({
			where: {
				requestId,
				value: false
			},
		});
	}

	async countAllYesByRequestId(requestId: number) {
		return this.voteModel.count({
			where: {
				requestId,
				value: true
			},
		});
	}

	findAllYesByRequestId(requestId: number): Promise<Vote[]> {
		return this.voteModel.findAll({
			where: {
				requestId,
				value: true
			},
			attributes: ['userId'],
			include: {
				model: User,
				attributes: ['hue', 'firstName']
			},
			raw: true
		});
	}

	findAllNoByRequestId(requestId: number): Promise<Vote[]> {
		return this.voteModel.findAll({
			where: {
				requestId,
				value: false
			},
			attributes: ['userId'],
			include: {
				model: User,
				attributes: ['hue', 'firstName']
			},
			raw: true
		});
	}

	async create(userId: number, createVoteDto: CreateVoteDto): Promise<Vote> {
		let vote: any;
		try {
			vote = await this.voteModel.create({
				userId,
				...createVoteDto,
			});
		} catch (error) {
			throw new ConflictException(error.name);
		}
		return vote;
	}

	findAllByRequestId(requestId: number): Promise<Vote[]> {
		return this.voteModel.findAll({
			where: {
				requestId
			},
			raw: true
		});
	}

	async findOne(id: number): Promise<Vote> {
		let vote = await this.voteModel.findOne({
			where: {
				id
			}
		});
		if (!vote) throw new NotFoundException('vote not found');
		return vote;
	}

	async update(id: number, updateVoteDto: UpdateVoteDto): Promise<Vote> {
		let vote = await this.findOne(id);
		try {
			for (let key in updateVoteDto) {
				vote[key] = updateVoteDto[key];
			}
		} catch (error) {
			throw new ConflictException(error.name);
		}
		await vote.save();
		return vote;
	}

	async remove(id: number): Promise<void> {
		let vote = await this.findOne(id);
		await vote.destroy();
	}
}
