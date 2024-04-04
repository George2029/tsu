import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vote } from './models/vote.entity';

@Module({
	imports: [SequelizeModule.forFeature([Vote])],
	controllers: [VotesController],
	providers: [VotesService],
})
export class VotesModule { }
