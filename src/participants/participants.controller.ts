import { Controller, Get, Post, Body, Put, Param, Delete, Session, UseGuards, ParseIntPipe } from '@nestjs/common';
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
	findAll(): Promise<Participant[]> {
		return this.participantsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<Participant> {
		return this.participantsService.findOne(id);
	}

	@UseGuards(VerifiedUserGuard) // return session.status === UserStatus.VERIFIED
	@Post()
	create(
		@Session() session: Record<string, any>,
		@Body() createParticipantDto: CreateParticipantDto,
	): Promise<Participant> {
		return this.participantsService.create(session.userId, createParticipantDto);
	}

	@UseGuards(VerifiedUserGuard, ParticipantGuard) // return participant.userId === session.userId
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() userUpdateParticipantDto: UserUpdateParticipantDto): Promise<Participant> {
		return this.participantsService.update(id, userUpdateParticipantDto);
	}

	@UseGuards(VerifiedUserGuard, ParticipantGuard)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.participantsService.remove(id);
	}
}
