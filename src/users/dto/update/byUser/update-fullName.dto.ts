import { IsString, IsOptional } from 'class-validator';

export class UpdateFullNameDto {
	@IsOptional()
	@IsString()
	fullName: string;
}
