import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

import { VerifiedUserGuard } from './../verified.user.guard';
import { FeedbackOwnerGuard } from './feedback.owner.guard';
import { FeedbackCreateGuard } from './feedback.create.guard';

@Controller('feedbacks')
export class FeedbacksController {
	constructor(private readonly feedbacksService: FeedbacksService) { }

	@Get()
	findAll() {
		return this.feedbacksService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.feedbacksService.findOne(id);
	}

	@UseGuards(VerifiedUserGuard, FeedbackCreateGuard) // checks whether participant.userId === session.userId 
	@Post(':participantId') // in this case the id is the participantId
	create(@Body() createFeedbackDto: CreateFeedbackDto, @Param('participantId') participantId: string) {
		return this.feedbacksService.create(participantId, createFeedbackDto);
	}

	@UseGuards(VerifiedUserGuard, FeedbackOwnerGuard) // checks whether feedback.participant.userId === session.userId
	@Put(':id')
	update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
		return this.feedbacksService.update(id, updateFeedbackDto);
	}

	@UseGuards(VerifiedUserGuard, FeedbackOwnerGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.feedbacksService.remove(id);
	}
}