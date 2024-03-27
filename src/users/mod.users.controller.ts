import { Controller, Put, Get, Param, Inject, Post } from '@nestjs/common';
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import type { SafeUser } from './types/safe.user.type';
import { RedisClientType } from 'redis';

@Controller('mod/users')
export class ModUsersController {
	constructor(
		private readonly usersService: UsersService,
		@Inject('REDIS_CLIENT')
		private readonly redisClient: RedisClientType
	) { }

	@Roles(['MODERATOR', 'ADMINISTRATOR'])
	@Get(':id')
	findOne(@Param('id') id: string): Promise<SafeUser> {
		return this.usersService.findOne(id);
	}

	@Roles(['MODERATOR', 'ADMINISTRATOR'])
	@Get()
	findAll(): Promise<SafeUser[]> {
		return this.usersService.findAll();
	}

	@Roles(['MODERATOR', 'ADMINISTRATOR'])
	@Put('experienced/:id')
	async changeRoleToExperienced(@Param('id') id: string): Promise<boolean> {

		let userSessionsIdsArr = await this.redisClient.hVals(`userId:${id}`);
		console.log(id);
		console.log(userSessionsIdsArr);
		userSessionsIdsArr.forEach(async (userSessionId) => {
			let session = await this.redisClient.get(`myapp:${userSessionId}`);
			console.log(session);
			let parsed = JSON.parse(session);
			console.log(parsed);
			parsed.role = 'EXPERIENCED';
			await this.redisClient.set(`myapp:${userSessionId}`, JSON.stringify(parsed));
		});
		return true;
	}

	@Roles(['MODERATOR', 'ADMINISTRATOR'])
	@Post('ban/:id')
	async ban(@Param('id') id: string): Promise<boolean> {
		return true;
	}


}
