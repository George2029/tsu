import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateVoteDto {
	@IsOptional()
	@IsBoolean()
	value: boolean;
}
