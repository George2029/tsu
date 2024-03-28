import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesControllerGlobalGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get(Roles, context.getClass());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		console.log(request.session);
		const userRole = request.session?.role;
		if (!userRole) return false;
		return roles.includes(userRole);
	}
}

