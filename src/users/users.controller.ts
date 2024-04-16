import { Body, Controller, Post, Session } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { SafeUser } from './types/safe.user.type';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	async create(@Session() session: Record<string, any>, @Body() createUserDto: CreateUserDto): Promise<SafeUser> {
		return this.usersService.create(session, createUserDto);
	}
}
