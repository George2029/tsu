import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Participant } from './models/participant.entity';
import { ParticipantsService } from './participants.service';

@Injectable()
export class ParticipantGuard implements CanActivate {
	constructor(
		private readonly participantsService: ParticipantsService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;

		console.log(session, params);

		let id = +params.id;

		if (isNaN(id)) throw new BadRequestException('participantId must be a numerical string');

		let participant: Participant = await this.participantsService.findOne(id);

		return participant.userId == session.userId; // allow only userdata owner to modify the data
	}
}

