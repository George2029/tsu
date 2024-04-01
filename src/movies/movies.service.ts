import { Injectable, ConflictException } from '@nestjs/common';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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

	async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
		let movie = await this.movieModel.findOne({
			where: {
				id
			}
		});

		for (let key in updateMovieDto) {
			movie[key] = updateMovieDto[key];
		}

		try {
			await movie.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		return movie;
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
