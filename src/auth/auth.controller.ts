import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from './../users/models/user.model';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('/signup')
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.authService.create(createUserDto);
	}

	@Post('/login')
	async login(@Body() loginUserDto: LoginUserDto): Promise<boolean> {
		return true;
	}

	@Post('/logout')
	logout(): boolean {
		return true;
	}

}
