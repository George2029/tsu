import { Controller, Delete, Param, Body, Put, ParseIntPipe } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { UserRole } from './../users/enums/userRole.enum';
import { Roles } from './../roles.decorator';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './models/request.entity';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/movierequests')
export class ModRequestsController {
	constructor(private movieRequestsService: RequestsService) { }

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.movieRequestsService.remove(id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateRequestDto: UpdateRequestDto): Promise<Request> {
		return this.movieRequestsService.update(id, updateRequestDto);
	}

}
