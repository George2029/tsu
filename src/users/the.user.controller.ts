import { Session, Body, Controller, Put, Get, UseGuards, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUsernameDto } from './dto/update/byUser/update-username.dto';
import { UpdatePasswordDto } from './dto/update/byUser/update-password.dto';
import { UpdateFirstNameDto } from './dto/update/byUser/update-firstName.dto';
import { UpdateEmailDto } from './dto/update/byUser/update-email.dto';
import { User } from './models/user.entity';
import { UserExistsGuard } from './userExists.guard';

@UseGuards(UserExistsGuard)
@Controller('user')
export class TheUserController {
	constructor(
		private readonly usersService: UsersService,
	) { }

	@Get()
	findOne(@Session() session: Record<string, any>): Record<string, any> {
		let { cookie, ...rest } = session;
		return rest;
	}

	@Post('verify/:uuid')
	async verifyUser(@Session() session: Record<string, any>, @Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<boolean> {
		return this.usersService.verifyUser(session.userId, uuid);
	}

	@Put('/username')
	async updateUsername(@Session() session: Record<string, any>, @Body() updateUsernameDto: UpdateUsernameDto): Promise<User> {
		let updatedUser = await this.usersService.update(session.userId, updateUsernameDto);
		return updatedUser;
	}

	@Put('/password')
	async updatePassword(@Session() session: Record<string, any>, @Body() updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
		return this.usersService.updatePassword(session.userId, updatePasswordDto);
	}

	@Put('/firstName')
	async updateFirstName(@Session() session: Record<string, any>, @Body() updateFirstNameDto: UpdateFirstNameDto): Promise<User> {
		let updatedUser = await this.usersService.update(session.userId, updateFirstNameDto);
		return updatedUser;
	}

	@Put('/email')
	async updateEmail(@Session() session: Record<string, any>, @Body() updateEmailDto: UpdateEmailDto): Promise<User> {
		let updatedUser = await this.usersService.updateEmail(session.userId, updateEmailDto);
		return updatedUser;
	}
}
