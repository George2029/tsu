import { Module } from '@nestjs/common';

import { EventsController } from './events.controller';
import { ModEventsController } from './mod.events.controller';

import { EventsService } from './events.service';

import { CustomEventConfigsService } from './customEventConfigs.service';
import { MovieEventConfigsService } from './movieEventConfigs.service';
import { ContestEventConfigsService } from './contestEventConfigs.service';
import { BoardGamesEventConfigsService } from './boardGamesEventConfigs.service';
import { ContendersService } from './contenders.service';

import { SequelizeModule } from '@nestjs/sequelize';

import { Event } from './models/event.entity';
import { MovieEventConfig } from './models/movieEventConfig.entity';
import { BoardGamesEventConfig } from './models/boardGamesEventConfig.entity';
import { ContestEventConfig } from './models/contestEventConfig.entity';
import { CustomEventConfig } from './models/customEventConfig.entity';
import { Contender } from './models/contender.entity';
import { ConfigsController } from './configs.controller';


@Module({
	imports: [SequelizeModule.forFeature([
		Event,
		BoardGamesEventConfig,
		ContestEventConfig,
		CustomEventConfig,
		MovieEventConfig,
		Contender
	])],
	controllers: [EventsController, ModEventsController, ConfigsController],
	providers: [
		EventsService,
		CustomEventConfigsService,
		MovieEventConfigsService,
		ContestEventConfigsService,
		BoardGamesEventConfigsService,
		ContendersService,
	],
})
export class EventsModule { }
