import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }


	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		return this.usersService.update(id, updateUserDto);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<User> {
		return this.usersService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.usersService.remove(id);
	}
}
