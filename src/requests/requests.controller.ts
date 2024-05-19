import { Controller, Get, Param, ParseIntPipe, ParseEnumPipe, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from './models/request.entity';
import { EventType } from './../events/enums/eventType.enum';

@Controller('requests')
export class RequestsController {
	constructor(private requestsService: RequestsService) { }

	@Get()
	findAll(@Query('type', new ParseEnumPipe(EventType, { optional: true })) type?: EventType, @Query('offset', new ParseIntPipe({ optional: true })) offset?: number, @Query('limit', new ParseIntPipe({ optional: true })) limit?: number): Promise<Request[]> {
		console.log(type, offset, limit);
		return this.requestsService.findAll({ type, offset, limit });
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Request> {
		return this.requestsService.findOne(id);
	}
}
