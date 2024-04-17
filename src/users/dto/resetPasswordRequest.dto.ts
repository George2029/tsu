import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ResetPasswordRequestDto {
	@IsString()
	@IsNotEmpty()
	@Length(6, 15)
	username: string;
}
