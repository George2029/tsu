import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { ModMoviesController } from './mod.movies.controller';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.entity';
import { EventMovie } from './models/eventMovie.entity';

@Module({
	imports: [SequelizeModule.forFeature([Movie, EventMovie])],
	controllers: [MoviesController, ModMoviesController],
	providers: [MoviesService]
})
export class MoviesModule { }
