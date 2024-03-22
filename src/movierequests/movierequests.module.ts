import { Module } from '@nestjs/common';
import { MovieRequestsController } from './movierequests.controller';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.model';
import { Vote } from './models/vote.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [SequelizeModule.forFeature([MovieRequest, Vote])],
	controllers: [MovieRequestsController],
	providers: [MovieRequestsService]
})
export class MovierequestsModule { }
