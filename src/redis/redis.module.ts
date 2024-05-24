import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Module({
	providers: [
		{
			provide: 'REDIS_CLIENT',
			useFactory: async () => {
				console.log(process.env.REDIS_URL);
				let client = createClient({ url: process.env.REDIS_URL });
				await client.connect();
				return client;
			}
		},
		RedisService
	],
	exports: ['REDIS_CLIENT', RedisService],
})

export class RedisModule { }
