import { UseGuards, Body, Controller, Param, Put, Get, Session } from '@nestjs/common';

import { UsersService } from './users.service';

import { UpdateUsernameDto } from './dto/update/byUser/update-username.dto';
import { UpdatePasswordDto } from './dto/update/byUser/update-password.dto';
import { UpdateFullNameDto } from './dto/update/byUser/update-fullName.dto';
import { UpdateEmailDto } from './dto/update/byUser/update-email.dto';

import { SafeUser } from './types/safe.user.type';
import { TheUserGuard } from './../the.user.guard';

@UseGuards(TheUserGuard)
@Controller('user/:id')
export class TheUserController {
	constructor(private readonly usersService: UsersService) { }

	@Get()
	findOne(@Param('id') id: string): Promise<SafeUser> {
		return this.usersService.findOne(id);
	}

	@Put('/username')
	async updateUsername(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updateUsernameDto: UpdateUsernameDto): Promise<SafeUser> {
		let updatedUser = await this.usersService.update(id, updateUsernameDto);
		session.username = updatedUser.username;
		return updatedUser;
	}

	@Put('/password')
	async updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto): Promise<void> {
		return this.usersService.updatePassword(id, updatePasswordDto);
	}

	@Put('/fullName')
	async updateFullName(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updateFullNameDto: UpdateFullNameDto): Promise<SafeUser> {
		let updatedUser = await this.usersService.update(id, updateFullNameDto);
		session.fullName = updatedUser.fullName;
		return updatedUser;
	}

	@Put('/email')
	async updateEmail(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto): Promise<SafeUser> {
		let updatedUser = await this.usersService.update(id, updateEmailDto);
		session.email = updatedUser.email;
		return updatedUser;
	}
}
