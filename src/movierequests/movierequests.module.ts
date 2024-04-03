import { Module } from '@nestjs/common';
import { MovieRequestsController } from './movierequests.controller';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModMovieRequestsController } from './mod.movierequests.controller';
import { ExperiencedMovieRequestsController } from './experienced.movierequests.controller';

@Module({
	imports: [SequelizeModule.forFeature([MovieRequest])],
	controllers: [MovieRequestsController, ModMovieRequestsController, ExperiencedMovieRequestsController],
	providers: [MovieRequestsService]
})
export class MovierequestsModule { }
