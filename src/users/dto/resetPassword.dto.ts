import { IsString, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
