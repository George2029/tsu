import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Participant } from './models/participant.model';
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

		let participant: Participant = await this.participantsService.findOne(params.id);

		if (!participant) throw new NotFoundException();

		return participant.userId == session?.userId; // allow only userdata owner to modify the data
	}
}

