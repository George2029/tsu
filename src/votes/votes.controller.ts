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

	@Get('/voter/:requestId')
	findVoteByRequestId(@Session() session: Record<string, any>, @Param('requestId', ParseIntPipe) requestId: number): Promise<Vote> {
		return this.votesService.findVoteByRequestId(session.userId, requestId);
	}

	@Get('/request/:id')
	findAllByRequestId(@Param('id', ParseIntPipe) requestId: number): Promise<Vote[]> {
		return this.votesService.findAllByRequestId(requestId);
	}

	@Get('/request/:id/yes')
	findAllYesByRequestId(@Param('id', ParseIntPipe) requestId: number): Promise<Vote[]> {
		return this.votesService.findAllYesByRequestId(requestId);
	}

	@Get('/request/:id/no')
	findAllByNoRequestId(@Param('id', ParseIntPipe) requestId: number): Promise<Vote[]> {
		return this.votesService.findAllNoByRequestId(requestId);
	}

	@Get('/request/:id/count')
	countAllByRequestId(@Param('id', ParseIntPipe) requestId: number): Promise<number> {
		return this.votesService.countAllByRequestId(requestId);
	}


	@Get('/request/:id/count/yes')
	countAllYesByRequestId(@Param('id', ParseIntPipe) requestId: number): Promise<number> {
		return this.votesService.countAllYesByRequestId(requestId);
	}

	@Get('/request/:id/count/no')
	countAllNoByRequestId(@Param('id', ParseIntPipe) requestId: number): Promise<number> {
		return this.votesService.countAllNoByRequestId(requestId);
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
