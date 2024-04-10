import { Module } from '@nestjs/common';

import { EventsController } from './events.controller';
import { ModEventsController } from './mod.events.controller';

import { EventsService } from './events.service';

import { CustomEventConfigService } from './customEventConfig.service';
import { MovieEventConfigService } from './movieEventConfig.service';
import { ContestEventConfigService } from './contestEventConfig.service';
import { BoardGamesEventConfigService } from './boardGamesEventConfig.service';
import { ContendersService } from './contenders.service';

import { SequelizeModule } from '@nestjs/sequelize';

import { Event } from './models/event.entity';
import { MovieEventConfig } from './models/movieEventConfig.entity';
import { BoardGamesEventConfig } from './models/boardGamesEventConfig.entity';
import { ContestEventConfig } from './models/contestEventConfig.entity';
import { CustomEventConfig } from './models/customEventConfig.entity';
import { Contender } from './models/contender.entity';


@Module({
	imports: [SequelizeModule.forFeature([
		Event,
		BoardGamesEventConfig,
		ContestEventConfig,
		CustomEventConfig,
		MovieEventConfig,
		Contender
	])],
	controllers: [EventsController, ModEventsController],
	providers: [
		EventsService,
		CustomEventConfigService,
		MovieEventConfigService,
		ContestEventConfigService,
		BoardGamesEventConfigService,
		ContendersService,
	],
})
export class EventsModule { }
