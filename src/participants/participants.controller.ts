import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Participant } from './models/participant.model';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller('participants')
export class ParticipantsController {
	constructor(
		private readonly participantsService: ParticipantsService
	) { }

	@Post()
	create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
		return this.participantsService.create(createParticipantDto);
	}

	@Get()
	findAll(): Promise<Participant[]> {
		return this.participantsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Participant> {
		return this.participantsService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.participantsService.remove(id);
	}

}
