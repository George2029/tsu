import { Controller, Post, Body, UseGuards, Session } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './../users/users.service';
import { RedisService } from './../redis/redis.service';
import { SafeUser } from './../users/types/safe.user.type';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisService: RedisService
	) { }

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Session() session: Record<string, any>, @Body() loginUserDto: LoginUserDto): Promise<boolean> {
		let user = await this.usersService.findOneByUsername(loginUserDto.username);
		let safeUser: SafeUser = this.usersService.getSafeUser(user);
		await this.redisService.initializeNewUserSession(session, safeUser);
		return true;
	}

	@Post('/logout')
	async logout(@Session() session: Record<string, any>) {
		await this.redisService.destroyOneSession(session);
		session.destroy(); // todo: delete session from `userId:${userId}` hash in redis
	}

	@Post('/logoutAll')
	async logoutFromAllDevices(@Session() session: Record<string, any>) {
		await this.redisService.destroyAllSessions(session.userId);
		session.destroy();
	}
}
