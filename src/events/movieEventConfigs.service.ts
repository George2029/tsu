import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { MovieEventConfig } from './models/movieEventConfig.entity';
import { CreateMovieEventConfigDto } from './dto/movieEventConfig/create-movieEventConfig.dto';
import { UpdateMovieEventConfigDto } from './dto/movieEventConfig/update-movieEventConfig.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MovieEventConfigsService {
	constructor(
		@InjectModel(MovieEventConfig)
		private readonly movieEventConfigModel: typeof MovieEventConfig
	) { }

	async countAllByEventId(eventId: number): Promise<number> {
		return this.movieEventConfigModel.count({
			where: {
				eventId
			}
		});
	}

	async findOne(id: number): Promise<MovieEventConfig> {

		let config = await this.movieEventConfigModel.findOne({
			where: {
				id
			}
		});

		if (!config) throw new NotFoundException('movie config not found');

		return config;
	}

	async findAllByEventId(eventId: number): Promise<MovieEventConfig[]> {
		return this.movieEventConfigModel.findAll({
			where: {
				eventId
			}
		});
	}

	async create(createMovieEventConfigDto: CreateMovieEventConfigDto): Promise<MovieEventConfig> {
		let config: any;
		try {
			config = await this.movieEventConfigModel.create({
				...createMovieEventConfigDto
			})
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return config;

	}

	async update(id: number, updateMovieEventConfigDto: UpdateMovieEventConfigDto) {
		let config = await this.findOne(id);

		for (let key in updateMovieEventConfigDto) {
			config[key] = updateMovieEventConfigDto[key];
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
