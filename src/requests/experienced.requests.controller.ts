import { Controller, Put, Post, Body, Delete, Param, UseGuards, Session, ParseIntPipe } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from './models/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { ExperiencedUpdateRequestDto } from './dto/experienced.update-request.dto';
import { RequestorGuard } from './requestor.guard';
import { Roles } from './../roles.decorator';
import { UserRole } from './../users/enums/userRole.enum';

@Roles([UserRole.EXPERIENCED, UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('experienced/requests')
export class ExperiencedRequestsController {
	constructor(private requestsService: RequestsService) { }

	@Post()
	create(@Session() session: Record<string, any>, @Body() createRequestDto: CreateRequestDto): Promise<Request> {
		return this.requestsService.create(session.userId, createRequestDto);
	}

	@UseGuards(RequestorGuard)
	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() experiencedUpdateRequestDto: ExperiencedUpdateRequestDto): Promise<Request> {
		return this.requestsService.update(id, experiencedUpdateRequestDto);
	}

	@UseGuards(RequestorGuard)
	@Delete(':id')
	Delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.requestsService.remove(id);
	}

}
