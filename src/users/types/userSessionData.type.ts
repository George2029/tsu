import { UserStatus } from './../enums/userStatus.enum';
import { UserRole } from './../enums/userRole.enum';

export type UserSessionData = {
	userId: number,
	username: string,
	fullName?: string,
	email: string,
	status: UserStatus,
	role: UserRole
}
