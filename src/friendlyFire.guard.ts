import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UsersService } from './users/users.service';
import type { SafeUser } from './users/types/safe.user.type';
import { UserRole } from './users/enums/userRole.enum';

@Injectable()
export class FriendlyFireGuard implements CanActivate {
	constructor(
		private readonly usersService: UsersService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		let { params } = context.switchToHttp().getRequest();
		let targetUserId = params.id;
		let userToBeModified: SafeUser = await this.usersService.findOne(targetUserId);
		return !([UserRole.MODERATOR, UserRole.ADMINISTRATOR].includes(userToBeModified.role));
	}
}
