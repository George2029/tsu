import { CreateBoardGamesEventConfigDto } from './create-boardGamesEventConfig.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBoardGamesEventConfigDto extends PartialType(CreateBoardGamesEventConfigDto) { }
