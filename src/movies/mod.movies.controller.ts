import { Body, Controller, Delete, Put, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './models/movie.entity';
import { UserRole } from './../users/enums/userRole.enum';
import { Roles } from './../roles.decorator';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('movies')
export class ModMoviesController {
	constructor(private readonly moviesService: MoviesService) { }

	@Post()
	create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
		return this.moviesService.create(createMovieDto);
	}

	@Put(':id')
	update(@Body() updateMovieDto: UpdateMovieDto, @Param('id') id: string): Promise<Movie> {
		return this.moviesService.update(id, updateMovieDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.moviesService.remove(id);
	}


}
