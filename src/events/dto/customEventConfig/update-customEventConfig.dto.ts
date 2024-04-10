import { CreateCustomEventConfigDto } from './create-customEventConfig.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCustomEventConfigDto extends PartialType(CreateCustomEventConfigDto) { }
