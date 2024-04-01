import { Controller, Get, Post, Body, Put, Param, Delete, Session, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantGuard } from './participant.guard';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UserUpdateParticipantDto } from './dto/user.update-participant.dto';

import { VerifiedUserGuard } from './../verified.user.guard';

@Controller('participants')
export class ParticipantsController {
	constructor(private readonly participantsService: ParticipantsService) { }

	@Get()
	findAll() {
		return this.participantsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.participantsService.findOne(id);
	}

	@UseGuards(VerifiedUserGuard) // return session.status === UserStatus.VERIFIED
	@Post(':eventId')
	create(
		@Body() createParticipantDto: CreateParticipantDto,
		@Session() session: Record<string, any>,
		@Param('eventId') eventId: string,
	) {
		// todo (tothink): fail on duplicate pair (userId-eventId)
		return this.participantsService.create(session.userId, eventId, createParticipantDto);
	}

	@UseGuards(VerifiedUserGuard, ParticipantGuard) // return participant.userId === session.userId
	@Put(':id')
	update(@Param('id') id: string, @Body() userUpdateParticipantDto: UserUpdateParticipantDto) {
		return this.participantsService.update(id, userUpdateParticipantDto);
	}

	@UseGuards(VerifiedUserGuard, ParticipantGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.participantsService.remove(id);
	}
}
