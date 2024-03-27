import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisClientType } from 'redis';

import { UpdatePasswordDto } from './dto/update/byUser/update-password.dto';
import * as bcrypt from 'bcrypt';
import type { UserSessionData } from './types/userSessionData.type';
import type { SafeUser } from './types/safe.user.type';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User,
		@Inject('REDIS_CLIENT')
		private readonly redisClient: RedisClientType
	) { }

	async sessionUpdate(session: Record<string, any>, user: User): Promise<void> {
		const userSessionData: UserSessionData = {
			user_id: user.id,
			username: user.username,
			fullName: user.fullName,
			email: user.email,
			status: user.status,
			role: user.role
		}

		for (const key in userSessionData) {
			session[key] = userSessionData[key];
		}
		let sessionsArr = await this.redisClient.hVals(`${user.id}`);
		console.log(sessionsArr);
		await this.redisClient.hSet(`userId:${user.id}`, session.id, session.id)
		return;
	}


	async create(session: Record<string, any>, createUserDto: CreateUserDto): Promise<void> {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(createUserDto.password, salt);
		let user: any;

		try {
			user = await this.userModel.create({
				username: createUserDto.username,
				fullName: createUserDto.fullName,
				email: createUserDto.email,
				visits: 0,
				role: UserRole.REGULAR,
				password: hashedPassword,
				status: UserStatus.UNVERIFIED
			});
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		this.sessionUpdate(session, user);
		return;

	}

	async updatePassword(session: Record<string, any>, id: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } });
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, salt);
		user.password = hashedPassword;
		await user.save();
		this.sessionUpdate(session, user);
		return;
	}

	async update(session: Record<string, any>, id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userModel.findOne({ where: { id } });
		if (user) {
			for (const key in updateUserDto) {
				user[key] = updateUserDto[key];
			}
		}

		try {
			await user.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		this.sessionUpdate(session, user);
		return user;
	}

	async findAll(): Promise<SafeUser[]> {
		let allUsers = await this.userModel.findAll();

		let filteredUsers: SafeUser[] = allUsers.map((user: User): SafeUser => {

			let safeUser: SafeUser = {
				id: user.id,
				username: user.username,
				fullName: user.fullName,
				visits: user.visits,
				email: user.email,
				role: user.role,
				status: user.status
			}

			return safeUser;
		});
		return filteredUsers;
	}

	async findOne(id: string): Promise<SafeUser> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		let safeUser = {
			id: user.id,
			email: user.email,
			username: user.username,
			fullName: user.fullName,
			visits: user.visits,
			role: user.role,
			status: user.status,

		}
		return safeUser;
	}

	findOneByUsername(username: string): Promise<User> {
		return this.userModel.findOne({
			where: {
				username,
			},
		});
	}

}
