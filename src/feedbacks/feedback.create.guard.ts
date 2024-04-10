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

		const { body, session } = request;

		console.log(session, body);

		let participantId = +body.participantId;

		if (isNaN(participantId)) throw new BadRequestException('participantId must be a numerical string');

		let participant: Participant = await this.participantsService.findOne(participantId);

		if (!participant) {
			throw new NotFoundException('participant not found');
		}

		if (participant.status !== ParticipantStatus.ISPRESENT) {
			throw new BadRequestException('particpant must be present at the event');
		}

		return participant.userId == session?.userId; // allow only if a requestor has the same userId as a provided participant
	}
}

