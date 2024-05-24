import { Controller, Get } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AppService } from './app.service';
import { UserRole } from './users/enums/userRole.enum';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
	@Get('mod')
	isMod(): boolean {
		return true;
	}

	@Roles([UserRole.MODERATOR, UserRole.EXPERIENCED, UserRole.ADMINISTRATOR])
	@Get('experienced')
	isExperienced(): boolean {
		return true;
	}
}
