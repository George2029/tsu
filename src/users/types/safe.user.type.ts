import { UserStatus } from './../enums/userStatus.enum';
import { UserRole } from './../enums/userRole.enum';

export type SafeUser = {
	id: number,
	username: string,
	fullName?: string,
	visits: number,
	email: string,
	status: UserStatus,
	role: UserRole
}
