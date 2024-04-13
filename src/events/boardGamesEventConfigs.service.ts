import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { BoardGamesEventConfig } from './models/boardGamesEventConfig.entity';
import { CreateBoardGamesEventConfigDto } from './dto/boardGamesEventConfig/create-boardGamesEventConfig.dto';
import { UpdateBoardGamesEventConfigDto } from './dto/boardGamesEventConfig/update-boardGamesEventConfig.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BoardGamesEventConfigsService {
	constructor(
		@InjectModel(BoardGamesEventConfig)
		private readonly boardGamesEventConfigModel: typeof BoardGamesEventConfig
	) { }

	async findOne(id: number): Promise<BoardGamesEventConfig> {

		let config = await this.boardGamesEventConfigModel.findOne({
			where: {
				id
			}
		});

		if (!config) throw new NotFoundException('boardGames config not found');

		return config;
	}

	async findAllByEventId(eventId: number): Promise<BoardGamesEventConfig[]> {
		return this.boardGamesEventConfigModel.findAll({
			where: {
				eventId
			}
		});
	}

	async create(createBoardGamesEventConfigDto: CreateBoardGamesEventConfigDto): Promise<BoardGamesEventConfig> {
		let config: any;
		try {
			config = await this.boardGamesEventConfigModel.create({
				...createBoardGamesEventConfigDto
			})
		} catch (error) {
			throw new ConflictException(error.name)
		}
		return config;

	}

	async update(id: number, updateBoardGamesEventConfigDto: UpdateBoardGamesEventConfigDto) {
		let config = await this.findOne(id);

		for (let key in updateBoardGamesEventConfigDto) {
			config[key] = updateBoardGamesEventConfigDto[key];
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
