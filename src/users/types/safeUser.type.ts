import { UserRole } from './../enums/userRole.enum';

export type SafeUser = {
	username: string,
	fullName?: string,
	role: UserRole
}
