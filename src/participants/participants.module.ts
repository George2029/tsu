import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant } from './models/participant.model';

@Module({
	imports: [SequelizeModule.forFeature([Participant])],
	controllers: [ParticipantsController],
	providers: [ParticipantsService],
})
export class ParticipantsModule { }
