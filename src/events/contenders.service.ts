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

		let contender = await this.contenderModel.findOne({
			where: {
				id
			}
		});

		if (!contender) throw new NotFoundException('contender not found');

		return contender;
	}

	async create(createContenderDto: CreateContenderDto): Promise<Contender> {
		let contender: any;
		try {
			contender = await this.contenderModel.create({
				...createContenderDto
			})
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return contender;

	}

	async update(id: number, updateContenderDto: UpdateContenderDto) {
		let contender = await this.findOne(id);

		for (let key in updateContenderDto) {
			contender[key] = updateContenderDto[key];
		}

		try {
			await contender.save()
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return contender;
	}

	async remove(id: number): Promise<void> {
		let contender = await this.findOne(id);
		return contender.destroy();
	}
}
