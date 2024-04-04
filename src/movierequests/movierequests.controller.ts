import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.entity';

@Controller('movierequests')
export class MovieRequestsController {
	constructor(private movieRequestsService: MovieRequestsService) { }

	@Get()
	findAll(): Promise<MovieRequest[]> {
		return this.movieRequestsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<MovieRequest> {
		return this.movieRequestsService.findOne(id);
	}
}
