import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException } from '@nestjs/common';
import { ParticipantsService } from './../participants/participants.service';
import { Participant } from './../participants/models/participant.entity';
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

		if (!participant) {
			throw new NotFoundException();
		}

		if (participant.status !== ParticipantStatus.ISPRESENT) {
			throw new BadRequestException('particpant must be present at the event');
		}

		return participant.userId == session?.userId; // allow only if a requestor has the same userId as a provided participant
	}
}

