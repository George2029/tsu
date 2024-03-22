import { Module } from '@nestjs/common';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './models/event.model';

//import { ParticipantsModule } from './../participants/participants.module';
//import { Participant } from './../participants/models/participant.model';

@Module({
	imports: [SequelizeModule.forFeature([Event])],
	controllers: [EventsController],
	providers: [EventsService],
})
export class EventsModule { }
