import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Contender } from './models/contender.entity';
import { CreateContenderDto } from './dto/contender/create-contender.dto';
import { UpdateContenderDto } from './dto/contender/update-contender.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContendersService {
	constructor(
		@InjectModel(Contender)
		private readonly contenderModel: typeof Contender
	) { }

	async findOne(id: number): Promise<Contender> {

		let config = await this.contenderModel.findOne({
			where: {
				id
			}
		});

		if (!config) throw new NotFoundException('movie config not found');

		return config;
	}

	async create(createContenderDto: CreateContenderDto): Promise<Contender> {
		let config: any;
		try {
			config = await this.contenderModel.create({
				...createContenderDto
			})
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return config;

	}

	async update(id: number, updateContenderDto: UpdateContenderDto) {
		let config = await this.findOne(id);

		for (let key in updateContenderDto) {
			config[key] = updateContenderDto[key];
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
