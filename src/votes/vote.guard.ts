import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Vote } from './models/vote.entity';
import { VotesService } from './votes.service';

@Injectable()
export class VoteGuard implements CanActivate {
	constructor(
		private readonly votesService: VotesService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;

		console.log(session, params);

		let id = +params.id;

		if (isNaN(id)) throw new BadRequestException('voteId has to be numerical string');

		let vote: Vote = await this.votesService.findOne(id);

		return vote.userId == session?.userId; // allow only userdata owner to modify the data
	}
}
