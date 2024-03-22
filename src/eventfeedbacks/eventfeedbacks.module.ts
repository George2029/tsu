import { Module } from '@nestjs/common';
import { EventFeedbacksController } from './eventfeedbacks.controller';
import { EventFeedbacksService } from './eventfeedbacks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventFeedback } from './models/eventFeedback.model';

@Module({
	imports: [SequelizeModule.forFeature([EventFeedback])],
	controllers: [EventFeedbacksController],
	providers: [EventFeedbacksService]
})
export class EventfeedbacksModule { }
