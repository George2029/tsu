import { Controller, Put, Param, Get } from '@nestjs/common'
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import { RedisService } from './../redis/redis.service';
import { ModUpdateUserDto } from './dto/mod.update-user.dto';
import { UserRole } from './enums/userRole.enum';
import { SafeUser } from './types/safe.user.type';

@Roles(['ADMINISTRATOR'])
@Controller('admin/users')
export class AdminUsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisService: RedisService
	) { }

	@Get('mods')
	async findAllMods(): Promise<SafeUser[]> {
		return this.usersService.findAllMods();
	}

	@Put('mod/:id')
	async mod(@Param('id') id: string): Promise<void> {
		let modUpdateUserDto: ModUpdateUserDto = {
			role: UserRole.MODERATOR
		}
		await this.redisService.updateSessionsByUserId(id, modUpdateUserDto);
		await this.usersService.update(id, modUpdateUserDto);
	}

	@Put('unmod/:id')
	async unmod(@Param('id') id: string): Promise<void> {
		let modUpdateUserDto: ModUpdateUserDto = {
			role: UserRole.EXPERIENCED
		}
		await this.redisService.updateSessionsByUserId(id, modUpdateUserDto);
		await this.usersService.update(id, modUpdateUserDto);
	}
}
