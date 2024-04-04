import { Controller, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ModUpdateParticipantDto } from './dto/mod.update-participant.dto';
import { Participant } from './models/participant.entity';
import { Roles } from './../roles.decorator'
import { UserRole } from './../users/enums/userRole.enum';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/participants')
export class ModParticipantsController {
	constructor(private readonly participantsService: ParticipantsService) { }

	@Put(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() modUpdateParticipantDto: ModUpdateParticipantDto): Promise<Participant> {
		return this.participantsService.update(id, modUpdateParticipantDto);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.participantsService.remove(id);
	}
}
