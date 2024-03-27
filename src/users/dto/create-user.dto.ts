import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
	@IsString()
	username: string;

	@IsOptional()
	@IsString()
	fullName: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
