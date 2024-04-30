import { Body, Controller, Post, Session, Get, Param, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enums/userRole.enum';
import { Roles } from './../roles.decorator';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';
import { User } from './models/user.entity';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get(':id')
	getUserPublicInfo(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.findOnePublicInfo(id);
	}

	@Get(':id/preview')
	getUserPreview(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.getUserPreview(id);
	}

	@Roles([UserRole.MODERATOR, UserRole.ADMINISTRATOR])
	@Get('canMod')
	checkIfCanMod(@Session() session: Record<string, any>): boolean {
		return true;
	}

	@Post()
	async create(@Session() session: Record<string, any>, @Body() createUserDto: CreateUserDto): Promise<User> {
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
