import { Controller, Put, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import type { SafeUser } from './types/safe.user.type';
import { RedisService } from './../redis/redis.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FriendlyFireGuard } from './../friendlyFire.guard';

@Roles(['MODERATOR', 'ADMINISTRATOR'])
@Controller('mod/users')
export class ModUsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisService: RedisService
	) { }

	@Get(':id')
	findOne(@Param('id') id: string): Promise<SafeUser> {
		return this.usersService.findOne(id);
	}

	@Get()
	findAll(): Promise<SafeUser[]> {
		return this.usersService.findAll();
	}

	@Put('experienced/:id')
	@UseGuards(FriendlyFireGuard)
	async changeRoleToExperienced(@Param('id') id: string): Promise<void> {


		let updateUserDto: UpdateUserDto = {
			role: UserRole.EXPERIENCED
		}

		// update in postgresql

		await this.usersService.update(id, updateUserDto);

		// update in redis (if there are any sessions associated with the userId)

		await this.redisService.updateSessionsByUserId(id, updateUserDto);
		return;
	}

	@Put('ban/:id')
	@UseGuards(FriendlyFireGuard)
	async ban(@Param('id') id: string): Promise<void> {

		let updateUserDto: UpdateUserDto = {
			status: UserStatus.BANNED
		}

		// update in postgresql

		await this.usersService.update(id, updateUserDto);

		// update in redis (if there are any sessions associated with the userId)

		await this.redisService.updateSessionsByUserId(id, updateUserDto);
		return;
	}

	@Put('unban/:id')
	@UseGuards(FriendlyFireGuard)
	async unban(@Param('id') id: string): Promise<void> {

		let updateUserDto: UpdateUserDto = {
			status: UserStatus.VERIFIED // there wouldn't be any point in banning an unverified user in the first place
		}

		// update in postgresql

		await this.usersService.update(id, updateUserDto);

		// update in redis (if there are any sessions associated with the userId)

		await this.redisService.updateSessionsByUserId(id, updateUserDto);
		return;
	}

}
