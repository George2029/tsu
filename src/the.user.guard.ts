import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class TheUserGuard implements CanActivate {

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { params, session } = request;
		console.log(session);
		return params.id == session?.userId; // allow only userdata owner to modify the data
	}
}

