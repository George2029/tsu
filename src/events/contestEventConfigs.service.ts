import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ContestEventConfig } from './models/contestEventConfig.entity';
import { CreateContestEventConfigDto } from './dto/contestEventConfig/create-contestEventConfig.dto';
import { UpdateContestEventConfigDto } from './dto/contestEventConfig/update-contestEventConfig.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContestEventConfigsService {
	constructor(
		@InjectModel(ContestEventConfig)
		private readonly contestEventConfigModel: typeof ContestEventConfig
	) { }

	async countAllByEventId(eventId: number): Promise<number> {
		return this.contestEventConfigModel.count({
			where: {
				eventId
			}
		});
	}

	async findOne(id: number): Promise<ContestEventConfig> {

		let config = await this.contestEventConfigModel.findOne({
			where: {
				id
			}
		});

		if (!config) throw new NotFoundException('contest config not found');

		return config;
	}

	async findAllByEventId(eventId: number): Promise<ContestEventConfig[]> {
		return this.contestEventConfigModel.findAll({
			where: {
				eventId
			}
		});
	}

	async create(createContestEventConfigDto: CreateContestEventConfigDto): Promise<ContestEventConfig> {
		let config: any;
		try {
			config = await this.contestEventConfigModel.create({
				...createContestEventConfigDto
			})
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return config;

	}

	async update(id: number, updateContestEventConfigDto: UpdateContestEventConfigDto) {
		let config = await this.findOne(id);

		for (let key in updateContestEventConfigDto) {
			config[key] = updateContestEventConfigDto[key];
		}

		try {
			await config.save()
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return config;
	}

	async remove(id: number): Promise<void> {
		let config = await this.findOne(id);
		return config.destroy();
	}
}
