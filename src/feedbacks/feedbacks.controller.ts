import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

import { VerifiedUserGuard } from './../verified.user.guard';
import { FeedbackOwnerGuard } from './feedback.owner.guard';
import { FeedbackCreateGuard } from './feedback.create.guard';
import { Feedback } from './models/feedback.entity';

@Controller('feedbacks')
export class FeedbacksController {
	constructor(private readonly feedbacksService: FeedbacksService) { }

	@Get()
	findAll(): Promise<Feedback[]> {
		return this.feedbacksService.findAll();
	}

	@Get('count/:eventId')
	countAllByEventId(@Param('eventId', ParseIntPipe) eventId: number): Promise<number> {
		return this.feedbacksService.countAllByEventId(eventId);
	}

	@Get('event/:eventId')
	findAllByEventId(@Param('eventId', ParseIntPipe) eventId: number): Promise<Feedback[]> {
		return this.feedbacksService.findAllByEventId(eventId);
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<Feedback> {
		return this.feedbacksService.findOne(id);
	}

	@UseGuards(VerifiedUserGuard, FeedbackCreateGuard) // checks whether participant.userId === session.userId 
	@Post()
	create(@Body() createFeedbackDto: CreateFeedbackDto) {
		return this.feedbacksService.create(createFeedbackDto);
	}

	@UseGuards(VerifiedUserGuard, FeedbackOwnerGuard) // checks whether feedback.participant.userId === session.userId
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
		return this.feedbacksService.update(id, updateFeedbackDto);
	}

	@UseGuards(VerifiedUserGuard, FeedbackOwnerGuard)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.feedbacksService.remove(id);
	}
}
