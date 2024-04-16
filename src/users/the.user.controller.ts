import { Session, Body, Controller, Put, Get, UseGuards, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUsernameDto } from './dto/update/byUser/update-username.dto';
import { UpdatePasswordDto } from './dto/update/byUser/update-password.dto';
import { UpdateFullNameDto } from './dto/update/byUser/update-fullName.dto';
import { UpdateEmailDto } from './dto/update/byUser/update-email.dto';
import { UserExistsGuard } from './userExists.guard';

import { SafeUser } from './types/safe.user.type';

@UseGuards(UserExistsGuard)
@Controller('user')
export class TheUserController {
	constructor(
		private readonly usersService: UsersService,
	) { }

	@Get()
	findOne(@Session() session: Record<string, any>): Promise<SafeUser> {
		return this.usersService.findOne(session.userId);
	}

	@Post('verify/:uuid')
	async verifyUser(@Session() session: Record<string, any>, @Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<boolean> {
		return this.usersService.verifyUser(session.userId, uuid);
	}

	@Put('/username')
	async updateUsername(@Session() session: Record<string, any>, @Body() updateUsernameDto: UpdateUsernameDto): Promise<SafeUser> {
		let updatedUser = await this.usersService.update(session.userId, updateUsernameDto);
		return updatedUser;
	}

	@Put('/password')
	async updatePassword(@Session() session: Record<string, any>, @Body() updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
		return this.usersService.updatePassword(session.userId, updatePasswordDto);
	}

	@Put('/fullName')
	async updateFullName(@Session() session: Record<string, any>, @Body() updateFullNameDto: UpdateFullNameDto): Promise<SafeUser> {
		let updatedUser = await this.usersService.update(session.userId, updateFullNameDto);
		return updatedUser;
	}

	@Put('/email')
	async updateEmail(@Session() session: Record<string, any>, @Body() updateEmailDto: UpdateEmailDto): Promise<SafeUser> {
		let updatedUser = await this.usersService.updateEmail(session.userId, updateEmailDto);
		return updatedUser;
	}
}
