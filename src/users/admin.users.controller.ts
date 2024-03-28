import { Controller, Put, Param } from '@nestjs/common'
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import { RedisService } from './../redis/redis.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/userRole.enum';

@Roles(['ADMINISTRATOR'])
@Controller('admin/users')
export class AdminUsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisService: RedisService
	) { }

	@Put('mod/:id')
	async mod(@Param('id') id: string): Promise<void> {
		let updateUserDto: UpdateUserDto = {
			role: UserRole.MODERATOR
		}
		await this.redisService.updateSessionsByUserId(id, updateUserDto);
		await this.usersService.update(id, updateUserDto);
	}

	@Put('unmod/:id')
	async unmod(@Param('id') id: string): Promise<void> {
		let updateUserDto: UpdateUserDto = {
			role: UserRole.EXPERIENCED
		}
		await this.redisService.updateSessionsByUserId(id, updateUserDto);
		await this.usersService.update(id, updateUserDto);
	}
}
