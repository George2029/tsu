import { UseGuards, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { Request } from './models/request.entity';
import { RequestorGuard } from './requestor.guard';

@Controller('requests')
export class RequestsController {
	constructor(private requestsService: RequestsService) { }

	@UseGuards(RequestorGuard)
	@Get(':id/isOwner')
	isOwner(): boolean {
		return true;
	}

	@Get()
	findAll(): Promise<Request[]> {
		return this.requestsService.findAll();
	}

	@Get("movies")
	findAllMovies(): Promise<Request[]> {
		return this.requestsService.findAllMovies();
	}

	@Get('boardgames')
	findAllBoardGames(): Promise<Request[]> {
		return this.requestsService.findAllBoardGames();
	}

	@Get('contests')
	findAllContests(): Promise<Request[]> {
		return this.requestsService.findAllContests();
	}

	@Get('custom')
	findAllCustom(): Promise<Request[]> {
		return this.requestsService.findAllCustom();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Request> {
		return this.requestsService.findOne(id);
	}
}
