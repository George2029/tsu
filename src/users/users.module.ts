import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TheUserController } from './the.user.controller';
import { ModUsersController } from './mod.users.controller';
import { UsersService } from './users.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { APP_PIPE } from '@nestjs/core';
import { RedisModule } from './../redis/redis.module';

@Module({
	imports: [SequelizeModule.forFeature([User]), RedisModule],
	controllers: [UsersController, TheUserController, ModUsersController],
	providers: [UsersService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
	exports: [SequelizeModule]
})
export class UsersModule { }
