import { IsEmail, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsOptional()
	@IsString()
	fullName?: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
