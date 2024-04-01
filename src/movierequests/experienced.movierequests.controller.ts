import { Controller, Put, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.model';
import { CreateMovieRequestDto } from './dto/create-movieRequest.dto';
import { ExperiencedUpdateMovieRequestDto } from './dto/experienced.update-movieRequest.dto';
import { MovieRequestorGuard } from './movieRequestor.guard';
import { Roles } from './../roles.decorator';
import { UserRole } from './../users/enums/userRole.enum';

@Roles([UserRole.EXPERIENCED, UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('experienced/movierequests')
export class ExperiencedMovieRequestsController {
	constructor(private movieRequestsService: MovieRequestsService) { }

	@Post()
	create(@Body() createMovieRequestDto: CreateMovieRequestDto): Promise<MovieRequest> {
		return this.movieRequestsService.create(createMovieRequestDto);
	}

	@UseGuards(MovieRequestorGuard)
	@Put(':id')
	update(@Param('id') id: string, @Body() experiencedUpdateMovieRequestDto: ExperiencedUpdateMovieRequestDto): Promise<MovieRequest> {
		return this.movieRequestsService.update(id, experiencedUpdateMovieRequestDto);
	}

	@UseGuards(MovieRequestorGuard)
	@Delete(':id')
	Delete(@Param('id') id: string): Promise<void> {
		return this.movieRequestsService.remove(id);
	}

}
