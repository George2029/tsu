import { Controller, Get, Post, Body, Put, Param, Delete, Session, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { VerifiedUserGuard } from './../verified.user.guard';
import { VoteGuard } from './vote.guard';

@Controller('votes')
export class VotesController {
	constructor(private readonly votesService: VotesService) { }

	@UseGuards(VerifiedUserGuard)
	@Post(':movieRequestId')
	create(@Session() session: Record<string, any>, @Param('movieRequestId', ParseIntPipe) movieRequestId: number, @Body() createVoteDto: CreateVoteDto) {
		return this.votesService.create(session.userId, movieRequestId, createVoteDto);
	}

	@Get()
	findAll() {
		return this.votesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.votesService.findOne(id);
	}

	@UseGuards(VoteGuard)
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateVoteDto: UpdateVoteDto) {
		return this.votesService.update(id, updateVoteDto);
	}

	@UseGuards(VoteGuard)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.votesService.remove(id);
	}
}
