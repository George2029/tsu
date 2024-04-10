import { CreateContenderDto } from './create-contender.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateContenderDto extends PartialType(CreateContenderDto) { }
