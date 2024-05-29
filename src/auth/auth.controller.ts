import { Controller, Post, Body, UseGuards, Session } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './../users/users.service';
import { RedisService } from './../redis/redis.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private readonly redisService: RedisService
	) { }

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Session() session: Record<string, any>, @Body() loginUserDto: LoginUserDto): Promise<true> {
		let user = await this.usersService.findOneByEmail(loginUserDto.email);
		let userSession = this.usersService.toUserSession(user);
		await this.redisService.initializeNewUserSession(session, userSession);
		return true;
	}

	@Post('/logout')
	async logout(@Session() session: Record<string, any>) {
		await this.redisService.destroyOneSession(session);
	}

	@Post('/logoutAll')
	async logoutFromAllDevices(@Session() session: Record<string, any>) {
		let { userId } = session;
		if (!userId) return;
		await this.redisService.destroyAllSessions(userId);
		return session.destroy();
	}
}
