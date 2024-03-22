import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { APP_PIPE } from '@nestjs/core';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
	exports: [SequelizeModule]
})
export class UsersModule { }
