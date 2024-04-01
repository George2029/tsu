import { Controller, Put, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import type { SafeUser } from './types/safe.user.type';
import { ModUpdateUserDto } from './dto/mod.update-user.dto';
import { FriendlyFireGuard } from './friendlyFire.guard';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/users')
export class ModUsersController {
	constructor(
		private readonly usersService: UsersService,
	) { }

	@Get('banned')
	findAllBanned(): Promise<SafeUser[]> {
		return this.usersService.findAllBanned();
	}

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


		let modUpdateUserDto: ModUpdateUserDto = {
			role: UserRole.EXPERIENCED
		}

		await this.usersService.update(id, modUpdateUserDto);

		return;
	}

	@Put('ban/:id')
	@UseGuards(FriendlyFireGuard)
	async ban(@Param('id') id: string): Promise<void> {

		let modUpdateUserDto: ModUpdateUserDto = {
			status: UserStatus.BANNED
		}

		await this.usersService.update(id, modUpdateUserDto);

		return;
	}

	@Put('unban/:id')
	@UseGuards(FriendlyFireGuard)
	async unban(@Param('id') id: string): Promise<void> {

		let modUpdateUserDto: ModUpdateUserDto = {
			status: UserStatus.VERIFIED // there wouldn't be any point in banning an unverified user in the first place
		}

		await this.usersService.update(id, modUpdateUserDto);
	}

}
