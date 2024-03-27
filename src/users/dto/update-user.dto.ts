import { IsEmail, IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { UserRole } from './../enums/userRole.enum';
import { UserStatus } from './../enums/userStatus.enum';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@IsString()
	fullName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;

	@IsOptional()
	@IsEnum(UserStatus)
	status?: UserStatus;

	@IsOptional()
	@IsInt()
	visits?: number;
}
