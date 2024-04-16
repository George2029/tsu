import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { TheUserController } from './the.user.controller';
import { ModUsersController } from './mod.users.controller';
import { AdminUsersController } from './admin.users.controller';

import { UsersService } from './users.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { FriendlyFireGuard } from './friendlyFire.guard';
import { UserExistsGuard } from './userExists.guard';
import { RedisModule } from './../redis/redis.module';
import { RedisService } from './../redis/redis.service';
import { RolesControllerGlobalGuard } from './../roles.controller.global.guard';

@Module({
	imports: [
		SequelizeModule.forFeature([User]),
		RedisModule
	],
	controllers: [
		UsersController,
		TheUserController,
		ModUsersController,
		AdminUsersController
	],
	providers: [
		UsersService,
		RedisService,
		{
			provide: APP_GUARD,
			useClass: RolesControllerGlobalGuard
		},
		FriendlyFireGuard,
		UserExistsGuard
	],
	exports: [
		SequelizeModule
	]
})
export class UsersModule { }
