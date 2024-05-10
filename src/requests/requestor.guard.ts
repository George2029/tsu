import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { UserStatus } from './../users/enums/userStatus.enum';
import { Request } from './models/request.entity';

@Injectable()
export class RequestorGuard implements CanActivate {
	constructor(private readonly requestsService: RequestsService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const { params, session } = request;
		let { userId, status } = session;

		let id = +params.id;

		if (isNaN(id)) throw new BadRequestException('requestId has to be a numerical string');

		let auth = status === UserStatus.VERIFIED;

		console.log(auth);

		if (!auth) return;

		console.log(2);

		let eventRequest: Request = await this.requestsService.findOne(params.id);

		if (!eventRequest) throw new BadRequestException();

		return eventRequest.userId == session.userId; // allow only userdata owner to modify the data
	}
}

