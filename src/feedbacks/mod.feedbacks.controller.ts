import { Put, Delete, Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
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
	update(@Param('id', ParseIntPipe) id: number, @Body() modUpdateFeedbackDto: ModUpdateFeedbackDto): Promise<Feedback> {
		return this.feedbacksService.update(id, modUpdateFeedbackDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.feedbacksService.remove(id);
	}
}
