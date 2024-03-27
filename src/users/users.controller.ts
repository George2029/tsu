import { Body, Controller, Post, Session } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	create(@Session() session: Record<string, any>, @Body() createUserDto: CreateUserDto): Promise<void> {
		return this.usersService.create(session, createUserDto);
	}

}
