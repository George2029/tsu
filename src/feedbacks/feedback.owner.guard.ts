import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Feedback } from './models/feedback.model';
import { FeedbacksService } from './feedbacks.service';

@Injectable()
export class FeedbackOwnerGuard implements CanActivate {
	constructor(
		private readonly feedbacksService: FeedbacksService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;

		console.log(session, params);

		let feedback: Feedback = await this.feedbacksService.findOneIncludeParticipant(params.id);

		if (!feedback) throw new BadRequestException();

		return feedback.participant.userId == session?.userId; // allow only userdata owner to modify the data
	}
}

