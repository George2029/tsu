import { PartialType } from '@nestjs/swagger';
import { CreateRequestDto } from './create-request.dto';

export class ExperiencedUpdateRequestDto extends PartialType(CreateRequestDto) { }
