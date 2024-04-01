import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { UserStatus } from './users/enums/userStatus.enum';

@Injectable()
export class RolesControllerGlobalGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get(Roles, context.getClass());
		if (!roles) {
			return true;
		}
		const { session } = context.switchToHttp().getRequest();
		console.log(session);
		if (session.status !== UserStatus.VERIFIED) {
			return false;
		}
		return roles.includes(session.role);
	}
}

