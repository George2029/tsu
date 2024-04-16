import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RequestsModule } from './requests/requests.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesHandlerGlobalGuard } from './roles.handler.global.guard';
import { RedisModule } from './redis/redis.module';

//import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { redisStore } from 'cache-manager-redis-yet';
import { ParticipantsModule } from './participants/participants.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { VotesModule } from './votes/votes.module';


@Module({
	imports: [
		/*CacheModule.registerAsync({
			useFactory: async () => ({
				store: await redisStore({
					ttl: 60 * 5 * 1000,
					url: process.env.REDIS_URL,
				}),
			}),
		}),*/
		ConfigModule.forRoot({
			isGlobal: true
		}),
		EventsModule,
		UsersModule,
		AuthModule,
		RequestsModule,
		RedisModule,
		SequelizeModule.forRoot({
			dialect: 'postgres',
			username: process.env.POSTGRES_DB_USER,
			database: process.env.POSTGRES_DB_DB,
			password: process.env.POSTGRES_PASSWORD,
			autoLoadModels: true,
			synchronize: true,
		}),
		ParticipantsModule,
		FeedbacksModule,
		VotesModule,
	],
	controllers: [AppController],
	providers: [AppService,
		{
			provide: APP_GUARD,
			useClass: RolesHandlerGlobalGuard,
		},
		/*{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},*/
	],
})
export class AppModule { }
