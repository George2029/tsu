import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './../users/users.service';
import { RedisModule } from './../redis/redis.module';

@Module({
	imports: [UsersModule, PassportModule, RedisModule],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, UsersService]
})
export class AuthModule { }
