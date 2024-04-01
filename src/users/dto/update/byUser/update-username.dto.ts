import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUsernameDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	username?: string;
}
