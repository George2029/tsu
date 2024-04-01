import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { ParticipantsService } from './../participants/participants.service';
import { Participant } from './../participants/models/participant.model';
import { ParticipantStatus } from './../participants/enums/participantStatus.enum';

@Injectable()
export class FeedbackCreateGuard implements CanActivate {
	constructor(
		private readonly participantsService: ParticipantsService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;

		console.log(session, params);

		let participant: Participant = await this.participantsService.findOne(params.participantId);

		if (!participant || participant.status !== ParticipantStatus.ISPRESENT) {
			throw new BadRequestException(); // a participant has to be present at the event to be able to leave a feedback
		}

		return participant.userId == session?.userId; // allow only if a requestor has the same userId as a provided participant
	}
}

