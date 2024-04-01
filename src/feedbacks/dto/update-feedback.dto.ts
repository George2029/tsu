import { IsInt, Max, Min, IsString, IsOptional } from 'class-validator';

export class UpdateFeedbackDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

	@IsOptional()
	@IsString()
	review?: string;
}
