import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { MovieRequestsService } from './movierequests.service';
import { UserStatus } from './../users/enums/userStatus.enum';
import { MovieRequest } from './models/movieRequest.entity';

@Injectable()
export class MovieRequestorGuard implements CanActivate {
	constructor(private readonly movierequestsService: MovieRequestsService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;

		console.log(session);

		let id = +params.id;

		if (isNaN(id)) throw new BadRequestException('movieRequestId has to be a numerical string');

		if (session?.status !== UserStatus.VERIFIED) return false;

		let movieRequest: MovieRequest = await this.movierequestsService.findOne(params.id);

		return movieRequest.userId == session.userId; // allow only userdata owner to modify the data
	}
}

