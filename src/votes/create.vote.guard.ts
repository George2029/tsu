import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
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

		let vote: Vote = await this.votesService.findOne(params.id);

		if (!vote) throw new NotFoundException();

		return vote.userId == session?.userId; // allow only userdata owner to modify the data
	}
}
