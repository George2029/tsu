import { IsOptional, IsString, IsEmail, IsInt, IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from './../enums/userStatus.enum';
import { UserRole } from './../enums/userRole.enum';

export class UpdateUserDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	username?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsEnum(UserStatus)
	status?: UserStatus;

	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;

	@IsOptional()
	@IsInt()
	visits?: number;

	@IsOptional()
	@IsInt()
	wins?: number;

	@IsOptional()
	@IsInt()
	level?: number;
}
