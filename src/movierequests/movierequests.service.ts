import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieRequest } from './models/movieRequest.entity';
import { CreateMovieRequestDto } from './dto/create-movieRequest.dto';
import { UpdateMovieRequestDto } from './dto/update-movieRequest.dto';

@Injectable()
export class MovieRequestsService {
	constructor(
		@InjectModel(MovieRequest)
		private readonly movieRequestModel: typeof MovieRequest,
	) { }

	async findOne(id: number): Promise<MovieRequest> {
		let movieRequest = await this.movieRequestModel.findOne({
			where: {
				id,
			},
		});
		if (!movieRequest) throw new NotFoundException('movieRequest not found');
		return movieRequest;
	}

	async findAll(): Promise<MovieRequest[]> {
		return this.movieRequestModel.findAll();
	}

	create(userId: number, createMovieRequestDto: CreateMovieRequestDto): Promise<MovieRequest> {
		return this.movieRequestModel.create({
			userId,
			...createMovieRequestDto,
			startTime: new Date(),
			endTime: new Date(
				(new Date).setDate((new Date()).getDate() + 7)
			)

		});
	}

	async update(id: number, updateMovieRequestDto: UpdateMovieRequestDto): Promise<MovieRequest> {
		let movieRequest = await this.movieRequestModel.findOne({
			where: {
				id,
			},
		});

		if (!movieRequest) throw new NotFoundException();

		for (const key in updateMovieRequestDto) {
			movieRequest[key] = updateMovieRequestDto[key]
		}

		try {
			await movieRequest.save();
		} catch (error) {
			throw new ConflictException(error.name)
		}

		return movieRequest;
	}

	async remove(id: number): Promise<void> {
		const movieRequest = await this.findOne(id);
		if (!movieRequest) throw new NotFoundException();
		await movieRequest.destroy();
	}
}
