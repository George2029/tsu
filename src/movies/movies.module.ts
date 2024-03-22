import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { EventMovie } from './models/eventMovie.model';

@Module({
	imports: [SequelizeModule.forFeature([Movie, EventMovie])],
	controllers: [MoviesController],
	providers: [MoviesService]
})
export class MoviesModule { }
