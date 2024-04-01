import { IsOptional, IsString, IsEmail, IsInt, IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from './../enums/userStatus.enum';
import { UserRole } from './../enums/userRole.enum';

export class UpdateUserDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	username?: string;

	@IsOptional()
	@IsString()
	fullName?: string;

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
}
