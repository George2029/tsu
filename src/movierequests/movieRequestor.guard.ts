import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { UserStatus } from './../users/enums/userStatus.enum';
import { MovieRequest } from './models/movieRequest.model';

@Injectable()
export class MovieRequestorGuard implements CanActivate {
	constructor(private readonly movierequestsService: MovieRequestsService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;

		console.log(session);

		if (session.status !== UserStatus.VERIFIED) return false;

		let movieRequest: MovieRequest = await this.movierequestsService.findOne(params.id);

		if (!movieRequest) throw new BadRequestException();

		return movieRequest.userId == session?.user_id; // allow only userdata owner to modify the data
	}
}

