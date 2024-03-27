import { UseGuards, Body, Controller, Param, Put, Get, Session } from '@nestjs/common';

import { User } from './models/user.model';

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
	updateUsername(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updateUsernameDto: UpdateUsernameDto): Promise<User> {
		return this.usersService.update(session, id, updateUsernameDto);
	}

	@Put('/password')
	updatePassword(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto): Promise<void> {
		return this.usersService.updatePassword(session, id, updatePasswordDto);
	}

	@Put('/fullName')
	updateFullName(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updateFullNameDto: UpdateFullNameDto): Promise<User> {
		return this.usersService.update(session, id, updateFullNameDto);
	}

	@Put('/email')
	updateEmail(@Session() session: Record<string, any>, @Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto): Promise<User> {
		return this.usersService.update(session, id, updateEmailDto);
	}
}
