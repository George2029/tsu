import { IsOptional, IsString } from 'class-validator';

export class ModUpdateFeedbackDto {
	@IsOptional()
	@IsString()
	review?: string;
}
