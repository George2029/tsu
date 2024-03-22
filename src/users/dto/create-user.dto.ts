import { UserRole } from './../enums/userRole.enum';
import { UserStatus } from './../enums/userStatus.enum';
import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
	@IsString()
	username: string;

	fullName: string | null;

	@IsEmail()
	email: string;

	@IsInt()
	visits: number;

	@IsString()
	role: UserRole;

	@IsString()
	password: string;

	@IsString()
	status: UserStatus;
}
