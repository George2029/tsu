import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class ModUpdateFeedbackDto {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	review?: string;
}
