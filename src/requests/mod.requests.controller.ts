import { Controller, Get, Delete, Param, Body, Put, ParseIntPipe } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { UserRole } from './../users/enums/userRole.enum';
import { Roles } from './../roles.decorator';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './models/request.entity';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/requests')
export class ModRequestsController {
	constructor(private requestsService: RequestsService) { }

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Request> {
		return this.requestsService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.requestsService.remove(id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateRequestDto: UpdateRequestDto): Promise<Request> {
		return this.requestsService.update(id, updateRequestDto);
	}

}
