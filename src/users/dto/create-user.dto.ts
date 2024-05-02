import { IsEmail, IsStrongPassword, MinLength, MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@MaxLength(50)
	@MinLength(6)
	@IsNotEmpty()
	@IsString()
	username: string;

	@MaxLength(50)
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@MaxLength(50)
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minNumbers: 1,
		minSymbols: 1,
		minUppercase: 1
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
