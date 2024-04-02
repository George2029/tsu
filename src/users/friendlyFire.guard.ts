import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'
import { UsersService } from './users.service';
import type { SafeUser } from './types/safe.user.type';
import { UserRole } from './enums/userRole.enum';

@Injectable()
export class FriendlyFireGuard implements CanActivate {
	constructor(
		private readonly usersService: UsersService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		let { params } = context.switchToHttp().getRequest();
		let targetUserId = +params.id;
		if (isNaN(targetUserId)) throw new BadRequestException(
			'Validation Error',
			{
				cause: new Error(),
				description: 'numeric string is expected'
			}
		);
		let userToBeModified: SafeUser = await this.usersService.findOne(targetUserId);
		return !([UserRole.MODERATOR, UserRole.ADMINISTRATOR].includes(userToBeModified.role));
	}
}
