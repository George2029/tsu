import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException } from '@nestjs/common';
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

		let id = +params.id;

		console.log(id);

		if (isNaN(id)) throw new BadRequestException('Validation failed', { cause: new Error(), description: 'numeric string is expected' });

		let feedback: Feedback = await this.feedbacksService.findOneIncludeParticipant(id);

		if (!feedback) throw new NotFoundException();

		return feedback.participant.userId == session?.userId; // allow only userdata owner to modify the data
	}
}

