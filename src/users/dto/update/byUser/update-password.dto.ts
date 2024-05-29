import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
	@IsString()
	@IsNotEmpty()
	oldPassword: string;

	@IsString()
	@MinLength(12)
	@IsNotEmpty()
	newPassword: string;
}
