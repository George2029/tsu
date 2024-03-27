import { Controller, Post, Body, UseGuards, Session, Inject } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { RedisClientType } from 'redis';

@Controller('auth')
export class AuthController {
	constructor(private readonly usersService: UsersService, @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) { }

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Session() session: Record<string, any>, @Body() loginUserDto: LoginUserDto) {
		let user = await this.usersService.findOneByUsername(loginUserDto.username);
		const cleanedUser = {
			user_id: user.id,
			username: user.username,
			fullName: user.fullName,
			email: user.email,
			status: user.status,
			role: user.role
		}

		for (const key in cleanedUser) {
			session[key] = cleanedUser[key];
		}
		console.log(session);
		let sessionsArr = await this.redisClient.hVals(`${user.id}`);
		console.log(sessionsArr);
		await this.redisClient.hSet(`userId:${user.id}`, session.id, session.id)
	}

	@Post('/logout')
	async logout(@Session() session: Record<string, any>) {
		session.destroy();
	}

}
