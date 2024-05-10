import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { UserStatus } from './users/enums/userStatus.enum';

@Injectable()
export class RolesHandlerGlobalGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get(Roles, context.getHandler());
		if (!roles) {
			return true;
		}
		const { session } = context.switchToHttp().getRequest();
		if (session.status !== UserStatus.VERIFIED) {
			return false;
		}
		return roles.includes(session.role);
	}
}

