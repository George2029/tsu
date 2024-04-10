import { PartialType } from '@nestjs/swagger';
import { CreateMovieEventConfigDto } from './create-movieEventConfig.dto';

export class UpdateMovieEventConfigDto extends PartialType(CreateMovieEventConfigDto) { }
