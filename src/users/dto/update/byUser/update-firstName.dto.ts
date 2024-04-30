import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateFirstNameDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	firstName?: string;
}
