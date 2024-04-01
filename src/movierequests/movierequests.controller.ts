import { Controller, Get, Param } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.model';

@Controller('movierequests')
export class MovieRequestsController {
	constructor(private movieRequestsService: MovieRequestsService) { }

	@Get()
	findAll(): Promise<MovieRequest[]> {
		return this.movieRequestsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<MovieRequest> {
		return this.movieRequestsService.findOne(id);
	}
}
