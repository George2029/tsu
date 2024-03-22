import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.model';
import { CreateMovieRequestDto } from './dto/create-movieRequest.dto';

@Controller('events')
export class MovieRequestsController {
	constructor(private movieRequestsService: MovieRequestsService) { }

	@Get()
	findAll(): Promise<MovieRequest[]> {
		return this.movieRequestsService.findAll();
	}

	@Post()
	create(@Body() createMovieRequestDto: CreateMovieRequestDto): Promise<MovieRequest> {
		return this.movieRequestsService.create(createMovieRequestDto);
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<MovieRequest> {
		return this.movieRequestsService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.movieRequestsService.remove(id);
	}
}
