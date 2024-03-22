import { Injectable } from '@nestjs/common';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
	constructor(
		@InjectModel(Movie)
		private readonly movieModel: typeof Movie,
	) { }

	create(createMovieDto: CreateMovieDto): Promise<Movie> {
		return this.movieModel.create({
			title: createMovieDto.title,
			language: createMovieDto.language,
			URL: createMovieDto.URL,
			duration: createMovieDto.duration,
		})
	}

	async findAll(): Promise<Movie[]> {
		return this.movieModel.findAll();
	}

	findOne(id: string): Promise<Movie> {
		return this.movieModel.findOne({
			where: {
				id,
			}
		})
	}

	async remove(id: string): Promise<void> {
		const movie = await this.findOne(id);
		await movie.destroy();
	}
}
