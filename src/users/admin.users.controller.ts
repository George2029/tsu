import { Controller, Put, Param, Get, Body, ParseIntPipe } from '@nestjs/common'
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import { RedisService } from './../redis/redis.service';
import { ModUpdateUserDto } from './dto/mod.update-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.entity';
import { UserRole } from './enums/userRole.enum';

@Roles(['ADMINISTRATOR'])
@Controller('admin/users')
export class AdminUsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisService: RedisService
	) { }

	@Get('mods')
	async findAllMods(): Promise<User[]> {
		return this.usersService.findAllMods();
	}

	@Put(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		return this.usersService.update(id, updateUserDto);
	}

	@Put('mod/:id')
	async mod(@Param('id', ParseIntPipe) id: number): Promise<User> {
		let modUpdateUserDto: ModUpdateUserDto = {
			role: UserRole.MODERATOR
		}
		await this.redisService.updateSessionsByUserId(id, modUpdateUserDto);
		return this.usersService.update(id, modUpdateUserDto);
	}

	@Put('unmod/:id')
	async unmod(@Param('id', ParseIntPipe) id: number): Promise<User> {
		let modUpdateUserDto: ModUpdateUserDto = {
			role: UserRole.EXPERIENCED
		}
		await this.redisService.updateSessionsByUserId(id, modUpdateUserDto);
		return this.usersService.update(id, modUpdateUserDto);
	}
}
