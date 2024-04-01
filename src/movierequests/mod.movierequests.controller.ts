import { Controller, Delete, Param, Body, Put } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { UserRole } from './../users/enums/userRole.enum';
import { Roles } from './../roles.decorator';
import { ModUpdateMovieRequestDto } from './dto/mod.update-movieRequest.dto';
import { MovieRequest } from './models/movieRequest.model';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/movierequests')
export class ModMovieRequestsController {
	constructor(private movieRequestsService: MovieRequestsService) { }

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.movieRequestsService.remove(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() modUpdateMovieRequestDto: ModUpdateMovieRequestDto): Promise<MovieRequest> {
		return this.movieRequestsService.update(id, modUpdateMovieRequestDto);
	}

}