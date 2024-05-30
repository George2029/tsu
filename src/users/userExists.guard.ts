import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UserExistsGuard implements CanActivate {

	canActivate(context: ExecutionContext): boolean {
		const { session } = context.switchToHttp().getRequest();
		console.log(`UserExistsGuard: `, session?.username);
		return session.userId !== undefined
	}
}

