import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './models/movie.model';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) { }

	@Post()
	create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
		return this.moviesService.create(createMovieDto);
	}

	@Get()
	findAll(): Promise<Movie[]> {
		return this.moviesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Movie> {
		return this.moviesService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.moviesService.remove(id);
	}


}
