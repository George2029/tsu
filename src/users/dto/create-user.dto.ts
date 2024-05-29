import { IsEmail, MinLength, MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@MaxLength(50)
	@IsNotEmpty()
	@IsString()
	username: string;

	@MaxLength(50)
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(12)
	@IsString()
	password: string;
}
