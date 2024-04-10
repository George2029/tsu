import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from './models/request.entity';

@Controller('requests')
export class RequestsController {
	constructor(private RequestsService: RequestsService) { }

	@Get()
	findAll(): Promise<Request[]> {
		return this.RequestsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Request> {
		return this.RequestsService.findOne(id);
	}
}
