import { CreateContestEventConfigDto } from './create-contestEventConfig.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateContestEventConfigDto extends PartialType(CreateContestEventConfigDto) { } 
