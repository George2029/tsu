import { UseGuards, Controller, Get, Param, ParseIntPipe, ParseEnumPipe, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from './models/request.entity';
import { RequestorGuard } from './requestor.guard';
import { EventType } from './../events/enums/eventType.enum';

@Controller('requests')
export class RequestsController {
	constructor(private requestsService: RequestsService) { }

	@UseGuards(RequestorGuard)
	@Get(':id/isOwner')
	isOwner(): boolean {
		return true;
	}

	@Get()
	findAll(@Query('type', new ParseEnumPipe(EventType, { optional: true })) type?: EventType): Promise<Request[]> {
		return this.requestsService.findAll(type);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Request> {
		return this.requestsService.findOne(id);
	}
}
