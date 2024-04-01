import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieRequest } from './models/movieRequest.model';
import { CreateMovieRequestDto } from './dto/create-movieRequest.dto';
import { UpdateMovieRequestDto } from './dto/update-movieRequest.dto';
import { MovieRequestStatus } from './enums/movieRequestStatus.enum';

@Injectable()
export class MovieRequestsService {
	constructor(
		@InjectModel(MovieRequest)
		private readonly movieRequestModel: typeof MovieRequest,
	) { }

	findOne(id: string): Promise<MovieRequest> {
		return this.movieRequestModel.findOne({
			where: {
				id,
			},
		});
	}

	async findAll(): Promise<MovieRequest[]> {
		return this.movieRequestModel.findAll();
	}

	create(createMovieRequestDto: CreateMovieRequestDto): Promise<MovieRequest> {
		return this.movieRequestModel.create({
			title: createMovieRequestDto.title,
			location: createMovieRequestDto.location,
			description: createMovieRequestDto.description,
			subtitlesSettings: createMovieRequestDto.subtitlesSettings,
			audioSettings: createMovieRequestDto.audioSettings,
			status: MovieRequestStatus.NOTPASSED,
			startTime: new Date(),
			endTime: new Date((new Date()).setDate((new Date()).getDate() + 7)),
		});
	}

	async update(id: string, updateMovieRequestDto: UpdateMovieRequestDto): Promise<MovieRequest> {
		let movieRequest = await this.movieRequestModel.findOne({
			where: {
				id,
			},
		});

		for (const key in updateMovieRequestDto) {
			movieRequest[key] = updateMovieRequestDto[key]
		}

		try {
			await movieRequest.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message)
		}

		return movieRequest;
	}

	async remove(id: string): Promise<void> {
		const movieRequest = await this.findOne(id);
		await movieRequest.destroy();
	}
}
