import { Injectable, Inject } from '@nestjs/common'
import { RedisClientType } from 'redis';
import { UpdateUserDto } from './../users/dto/update-user.dto';
import { SafeUser } from './../users/types/safe.user.type';

@Injectable()
export class RedisService {
	constructor(
		@Inject('REDIS_CLIENT')
		private readonly redisClient: RedisClientType
	) { }

	async initializeNewUserSession(session: Record<string, any>, user: SafeUser): Promise<void> {
		let { id, ...userSessionData } = user;
		Object.assign(session, userSessionData);
		session.userId = id;
		await this.redisClient.hSet(`userId:${user.id}`, session.id, session.id);
	}


	async updateSessionsByUserId(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
		let userSessionIdsArr = await this.redisClient.hVals(`userId:${userId}`);

		console.log(userSessionIdsArr);

		userSessionIdsArr.forEach(async (userSessionId) => {
			let session = JSON.parse(await this.redisClient.get(`myapp:${userSessionId}`));

			for (let key in updateUserDto) {
				session[key] = updateUserDto[key];
			}

			await this.redisClient.set(`myapp:${userSessionId}`, JSON.stringify(session));
		});
	}

}
