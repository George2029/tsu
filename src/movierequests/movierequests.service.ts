import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieRequest } from './models/movieRequest.model';
import { CreateMovieRequestDto } from './dto/create-movieRequest.dto';

@Injectable()
export class MovieRequestsService {
	constructor(
		@InjectModel(MovieRequest)
		private readonly movieRequestModel: typeof MovieRequest,
	) { }

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
			status: createMovieRequestDto.status,
			startTime: createMovieRequestDto.startTime,
			endTime: createMovieRequestDto.endTime,
		});
	}

	findOne(id: string): Promise<MovieRequest> {
		return this.movieRequestModel.findOne({
			where: {
				id,
			},
		});
	}

	async remove(id: string): Promise<void> {
		const movieRequest = await this.findOne(id);
		await movieRequest.destroy();
	}
}
