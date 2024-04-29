import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CustomEventConfig } from './models/customEventConfig.entity';
import { CreateCustomEventConfigDto } from './dto/customEventConfig/create-customEventConfig.dto';
import { UpdateCustomEventConfigDto } from './dto/customEventConfig/update-customEventConfig.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomEventConfigsService {
	constructor(
		@InjectModel(CustomEventConfig)
		private readonly customEventConfigModel: typeof CustomEventConfig
	) { }

	async countAllByEventId(eventId: number): Promise<number> {
		return this.customEventConfigModel.count({
			where: {
				eventId
			}
		});
	}

	async findOne(id: number): Promise<CustomEventConfig> {

		let config = await this.customEventConfigModel.findOne({
			where: {
				id
			}
		});

		if (!config) throw new NotFoundException('custom config not found');

		return config;
	}

	async findAllByEventId(eventId: number): Promise<CustomEventConfig[]> {
		return this.customEventConfigModel.findAll({
			where: {
				eventId
			}
		});
	}

	async create(createCustomConfigDto: CreateCustomEventConfigDto): Promise<CustomEventConfig> {
		let config: any;
		try {
			config = await this.customEventConfigModel.create({
				...createCustomConfigDto
			})
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return config;

	}

	async update(id: number, updateCustomEventConfigDto: UpdateCustomEventConfigDto) {
		let config = await this.findOne(id);

		for (let key in updateCustomEventConfigDto) {
			config[key] = updateCustomEventConfigDto[key];
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
