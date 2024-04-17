import { Body, Controller, Post, Session, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { SafeUser } from './types/safe.user.type';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	async create(@Session() session: Record<string, any>, @Body() createUserDto: CreateUserDto): Promise<SafeUser> {
		return this.usersService.create(session, createUserDto);
	}

	@Post('resetPasswordRequest')
	resetPasswordRequest(@Body() resetPasswordRequestDto: ResetPasswordRequestDto): Promise<{ email: string }> {
		return this.usersService.resetPasswordRequest(resetPasswordRequestDto);
	}

	@Get('resetpw/:id')
	doesPasswordResetRequestIdExist(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
		return this.usersService.doesPasswordResetRequestIdExist(id);
	}

	@Post('resetpw')
	resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
		return this.usersService.resetPassword(resetPasswordDto);
	}

}
