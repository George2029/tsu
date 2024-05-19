import { Controller, Get, Post, Body, Put, NotFoundException, Param, Session, UseGuards, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantGuard } from './participant.guard';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UserUpdateParticipantDto } from './dto/user.update-participant.dto';
import { Participant } from './models/participant.entity';

import { VerifiedUserGuard } from './../verified.user.guard';

@Controller('participants')
export class ParticipantsController {
	constructor(private readonly participantsService: ParticipantsService) { }

	@Get()
	findAllUserParticipations(@Session() session: Record<string, any>): Promise<Participant[]> {
		if (!session.userId) throw new NotFoundException()
		return this.participantsService.findAllUserParticipations(session.userId);
	}

	@Get('count/:eventId')
	countAllGoingByEventId(@Param('eventId', ParseIntPipe) eventId: number): Promise<number> {
		return this.participantsService.countAllGoingByEventId(eventId);
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<Participant> {
		return this.participantsService.findOne(id);
	}

	@Get('self/:eventId')
	async findSelfAsParticipant(@Param('eventId', ParseIntPipe) eventId: number, @Session() session: Record<string, any>): Promise<Participant> {
		if (!session.userId) throw new UnauthorizedException();
		return this.participantsService.findOneByUserIdAndEventId(session.userId, eventId);
	}

	@Get('event/:eventId')
	async findAllByEventId(
		@Param('eventId', ParseIntPipe) eventId: number
	): Promise<Participant[]> {
		return this.participantsService.findAllByEventId(eventId);
	}

	@UseGuards(VerifiedUserGuard) // return session.status === UserStatus.VERIFIED
	@Post()
	create(
		@Session() session: Record<string, any>,
		@Body() createParticipantDto: CreateParticipantDto,
	): Promise<Participant> {
		return this.participantsService.create(session.userId, createParticipantDto);
	}

	@UseGuards(ParticipantGuard) // return participant.userId === session.userId
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() userUpdateParticipantDto: UserUpdateParticipantDto): Promise<Participant> {
		return this.participantsService.update(id, userUpdateParticipantDto);
	}

}
