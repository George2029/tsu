import { Controller, Post, Body, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';

import { EventsService } from './events.service';

import { Event } from './models/event.entity';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';


import { CreateCustomEventConfigDto } from './dto/customEventConfig/create-customEventConfig.dto';
import { CreateBoardGamesEventConfigDto } from './dto/boardGamesEventConfig/create-boardGamesEventConfig.dto';
import { CreateMovieEventConfigDto } from './dto/movieEventConfig/create-movieEventConfig.dto';
import { CreateContestEventConfigDto } from './dto/contestEventConfig/create-contestEventConfig.dto';
import { CreateContenderDto } from './dto/contender/create-contender.dto';

import { UpdateCustomEventConfigDto } from './dto/customEventConfig/update-customEventConfig.dto';
import { UpdateBoardGamesEventConfigDto } from './dto/boardGamesEventConfig/update-boardGamesEventConfig.dto';
import { UpdateMovieEventConfigDto } from './dto/movieEventConfig/update-movieEventConfig.dto';
import { UpdateContestEventConfigDto } from './dto/contestEventConfig/update-contestEventConfig.dto';
import { UpdateContenderDto } from './dto/contender/update-contender.dto';

import { CustomEventConfig } from './models/customEventConfig.entity';
import { BoardGamesEventConfig } from './models/boardGamesEventConfig.entity';
import { MovieEventConfig } from './models/movieEventConfig.entity';
import { ContestEventConfig } from './models/contestEventConfig.entity';
import { Contender } from './models/contender.entity';

import { CustomEventConfigsService } from './customEventConfigs.service';
import { MovieEventConfigsService } from './movieEventConfigs.service';
import { BoardGamesEventConfigsService } from './boardGamesEventConfigs.service';
import { ContestEventConfigsService } from './contestEventConfigs.service';
import { ContendersService } from './contenders.service';

import { Roles } from './../roles.decorator';
import { UserRole } from './../users/enums/userRole.enum';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/events')
export class ModEventsController {
	constructor(
		private readonly eventsService: EventsService,
		private readonly customEventConfigsService: CustomEventConfigsService,
		private readonly movieEventConfigsService: MovieEventConfigsService,
		private readonly boardGamesEventConfigsService: BoardGamesEventConfigsService,
		private readonly contestEventConfigsService: ContestEventConfigsService,
		private readonly contendersService: ContendersService,
	) { }

	@Post()
	create(@Body() createEventDto: CreateEventDto): Promise<Event> {
		return this.eventsService.create(createEventDto);
	}

	@Post('custom')
	createCustomEventConfig(@Body() createCustomEventConfigDto: CreateCustomEventConfigDto): Promise<CustomEventConfig> {
		return this.customEventConfigsService.create(createCustomEventConfigDto);
	}

	@Post('movie')
	createMovieEventConfig(@Body() createMovieEventConfigDto: CreateMovieEventConfigDto): Promise<MovieEventConfig> {
		return this.movieEventConfigsService.create(createMovieEventConfigDto);
	}

	@Post('boardgames')
	createBoardGamesEventConfig(@Body() createBoardGamesEventConfigDto: CreateBoardGamesEventConfigDto): Promise<BoardGamesEventConfig> {
		return this.boardGamesEventConfigsService.create(createBoardGamesEventConfigDto);
	}

	@Post('contest')
	createContestEventConfig(@Body() createContestEventConfigDto: CreateContestEventConfigDto): Promise<ContestEventConfig> {
		return this.contestEventConfigsService.create(createContestEventConfigDto);
	}

	@Post('contender')
	createContender(@Body() createContenderDto: CreateContenderDto): Promise<Contender> {
		return this.contendersService.create(createContenderDto);
	}

	@Put(':id')
	update(@Body() updateEventDto: UpdateEventDto, @Param('id', ParseIntPipe) id: number): Promise<Event> {
		return this.eventsService.update(id, updateEventDto);
	}

	@Put('custom/:id')
	updateCustomEventConfig(@Body() updateCustomEventConfigDto: UpdateCustomEventConfigDto, @Param('id', ParseIntPipe) id: number): Promise<CustomEventConfig> {
		return this.customEventConfigsService.update(id, updateCustomEventConfigDto);
	}

	@Put('movie/:id')
	updateMovieEventConfig(@Body() updateMovieEventConfigDto: UpdateMovieEventConfigDto, @Param('id', ParseIntPipe) id: number): Promise<MovieEventConfig> {
		return this.movieEventConfigsService.update(id, updateMovieEventConfigDto);
	}

	@Put('boardgames/:id')
	updateBoardGamesEventConfig(@Body() updateBoardGamesEventConfigDto: UpdateBoardGamesEventConfigDto, @Param('id', ParseIntPipe) id: number): Promise<BoardGamesEventConfig> {
		return this.boardGamesEventConfigsService.update(id, updateBoardGamesEventConfigDto);
	}

	@Put('contest/:id')
	updateContestEventConfig(@Body() updateContestEventConfigDto: UpdateContestEventConfigDto, @Param('id', ParseIntPipe) id: number): Promise<ContestEventConfig> {
		return this.contestEventConfigsService.update(id, updateContestEventConfigDto);
	}

	@Put('contender/:id')
	updateContender(@Body() updateContenderDto: UpdateContenderDto, @Param('id', ParseIntPipe) id: number): Promise<Contender> {
		return this.contendersService.update(id, updateContenderDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.eventsService.remove(id);
	}

	@Delete('custom/:id')
	removeCustomEventConfig(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.customEventConfigsService.remove(id);
	}

	@Delete('movie/:id')
	removeMovieEventConfig(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.movieEventConfigsService.remove(id);
	}

	@Delete('boardgames/:id')
	removeBoardGamesEventConfig(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.boardGamesEventConfigsService.remove(id);
	}

	@Delete('contest/:id')
	removeContestEventConfig(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.contestEventConfigsService.remove(id);
	}

	@Delete('contender/:id')
	removeContender(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.contendersService.remove(id);
	}

}
