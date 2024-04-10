import { IsOptional, IsInt, IsEnum } from 'class-validator';
import { UserStatus } from './../enums/userStatus.enum';
import { UserRole } from './../enums/userRole.enum';

export class ModUpdateUserDto {
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
