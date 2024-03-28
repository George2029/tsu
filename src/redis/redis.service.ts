import { Injectable, Inject } from '@nestjs/common'
import { RedisClientType } from 'redis';
import { UpdateUserDto } from './../users/dto/update-user.dto';

@Injectable()
export class RedisService {
	constructor(
		@Inject('REDIS_CLIENT')
		private readonly redisClient: RedisClientType
	) { }

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
