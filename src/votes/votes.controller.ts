import { Controller, Get, Post, Body, Put, Param, Delete, Session, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { VerifiedUserGuard } from './../verified.user.guard';
import { VoteGuard } from './vote.guard';
import { Vote } from './models/vote.entity';

@Controller('votes')
export class VotesController {
	constructor(private readonly votesService: VotesService) { }

	@UseGuards(VerifiedUserGuard)
	@Post()
	create(@Session() session: Record<string, any>, @Body() createVoteDto: CreateVoteDto): Promise<Vote> {
		return this.votesService.create(session.userId, createVoteDto);
	}

	@Get()
	findAll(): Promise<Vote[]> {
		return this.votesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Vote> {
		return this.votesService.findOne(id);
	}

	@UseGuards(VoteGuard)
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateVoteDto: UpdateVoteDto): Promise<Vote> {
		return this.votesService.update(id, updateVoteDto);
	}

	@UseGuards(VoteGuard)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.votesService.remove(id);
	}
}
