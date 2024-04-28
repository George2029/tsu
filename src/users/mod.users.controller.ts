import { Controller, Put, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import { User } from './models/user.entity';
import { ModUpdateUserDto } from './dto/mod.update-user.dto';
import { FriendlyFireGuard } from './friendlyFire.guard';

@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
@Controller('mod/users')
export class ModUsersController {
	constructor(
		private readonly usersService: UsersService,
	) { }

	@Get('banned')
	findAllBanned(): Promise<User[]> {
		return this.usersService.findAllBanned();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.findOne(id);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Put('experienced/:id')
	@UseGuards(FriendlyFireGuard)
	async changeRoleToExperienced(@Param('id', ParseIntPipe) id: number): Promise<User> {


		let modUpdateUserDto: ModUpdateUserDto = {
			role: UserRole.EXPERIENCED
		}

		return this.usersService.update(id, modUpdateUserDto);

	}

	@Put('ban/:id')
	@UseGuards(FriendlyFireGuard)
	async ban(@Param('id', ParseIntPipe) id: number): Promise<User> {

		let modUpdateUserDto: ModUpdateUserDto = {
			status: UserStatus.BANNED
		}

		return this.usersService.update(id, modUpdateUserDto);

	}

	@Put('unban/:id')
	@UseGuards(FriendlyFireGuard)
	async unban(@Param('id', ParseIntPipe) id: number): Promise<User> {

		let modUpdateUserDto: ModUpdateUserDto = {
			status: UserStatus.VERIFIED // there wouldn't be any point in banning an unverified user in the first place
		}

		return this.usersService.update(id, modUpdateUserDto);
	}

}
