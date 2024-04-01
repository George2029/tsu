import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserStatus } from './users/enums/userStatus.enum';

@Injectable()
export class VerifiedUserGuard implements CanActivate {

	canActivate(context: ExecutionContext): boolean {
		const { session } = context.switchToHttp().getRequest();
		console.log(session);
		return session.status === UserStatus.VERIFIED
	}
}

