import { Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { Roles } from './../roles.decorator';
import { ModUpdateFeedbackDto } from './dto/mod.update-feedback.dto';
import { UserRole } from './../users/enums/userRole.enum';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from './models/feedback.model';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/feedbacks')
export class ModFeedbacksController {
	constructor(
		private readonly feedbacksService: FeedbacksService
	) { }


	@Put(':id')
	update(@Param('id') id: string, @Body() modUpdateFeedbackDto: ModUpdateFeedbackDto): Promise<Feedback> {
		return this.feedbacksService.update(id, modUpdateFeedbackDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.feedbacksService.remove(id);
	}
}
