import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { RedisClientType } from 'redis';
import { UpdateUserDto } from './../users/dto/update-user.dto';
import { SafeUser } from './../users/types/safe.user.type';

@Injectable()
export class RedisService {
	constructor(
		@Inject('REDIS_CLIENT')
		private readonly redisClient: RedisClientType
	) { }

	async savePasswordResetRequestId(uuid: string, userId: number): Promise<void> {
		await this.redisClient.setEx(uuid, 60 * 10, userId.toString());
	}

	async getPasswordResetRequestUserId(uuid: string, deleteOnSuccess?: boolean): Promise<string> {
		let id = await this.redisClient.get(uuid);
		if (id) {
			if (deleteOnSuccess) {
				this.redisClient.del(uuid);
			}
			return id;
		}
		throw new NotFoundException();
	}

	async saveVerificationId(userId: number, uuid: string): Promise<void> {
		await this.redisClient.set(`${userId}:verify`, uuid);
	}

	async checkVerificationId(userId: number, uuid: string): Promise<boolean> {
		let value = await this.redisClient.get(`${userId}:verify`);
		if (value === uuid) {
			this.redisClient.del(`${userId}:verify`);
			return true;
		} else {
			return false
		}
	}

	async initializeNewUserSession(session: Record<string, any>, user: SafeUser): Promise<void> {
		let { id, ...userSessionData } = user;
		Object.assign(session, userSessionData);
		session.userId = id;
		await this.redisClient.hSet(`userId:${user.id}`, session.id, session.id);
	}

	async destroyOneSession(session: Record<string, any>): Promise<void> {
		await this.redisClient.hDel(`userId:${session.userId}`, session.id);
	}

	async destroyAllSessions(userId: number): Promise<void> {
		let userSessionIdsArr = await this.redisClient.hVals(`userId:${userId}`);
		console.log(userSessionIdsArr);
		userSessionIdsArr.forEach(async (userSessionId) => {
			await this.redisClient.del(`myapp:${userSessionId}`);
		});
		await this.redisClient.del(`userId:${userId}`);
	}



	async updateSessionsByUserId(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
		let userSessionIdsArr = await this.redisClient.hVals(`userId:${userId}`);

		console.log(userSessionIdsArr);

		userSessionIdsArr.forEach(async (userSessionId) => {
			let session = JSON.parse(await this.redisClient.get(`myapp:${userSessionId}`));

			if (!session) return;

			for (let key in updateUserDto) {
				session[key] = updateUserDto[key];
			}

			await this.redisClient.set(`myapp:${userSessionId}`, JSON.stringify(session));
		});
	}

}
