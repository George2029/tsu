import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: 'REDIS_OPTIONS',
			useValue: {
				url: process.env.REDIS_URL
			}
		},
		{
			inject: ['REDIS_OPTIONS'],
			provide: 'REDIS_CLIENT',
			useFactory: async (options: { url: string }) => {
				const client = createClient(options);
				await client.connect();
				return client;
			}
		},
		RedisService
	],
	exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule { }
