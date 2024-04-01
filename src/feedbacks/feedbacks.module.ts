import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { ParticipantsModule } from './../participants/participants.module';
import { ParticipantsService } from './../participants/participants.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feedback } from './models/feedback.model';
import { ModFeedbacksController } from './mod.feedbacks.controller';

@Module({
	imports: [SequelizeModule.forFeature([Feedback]), ParticipantsModule],
	controllers: [FeedbacksController, ModFeedbacksController],
	providers: [FeedbacksService, ParticipantsService],
})
export class FeedbacksModule { }
