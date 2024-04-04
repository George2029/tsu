import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ModParticipantsController } from './mod.participants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant } from './models/participant.entity';
import { ParticipantGuard } from './participant.guard';

@Module({
	imports: [SequelizeModule.forFeature([Participant])],
	controllers: [ParticipantsController, ModParticipantsController],
	providers: [ParticipantsService, ParticipantGuard],
	exports: [ParticipantsService, SequelizeModule]
})
export class ParticipantsModule { }
