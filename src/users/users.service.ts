import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models/user.entity';

import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UpdatePasswordDto } from './dto/update/byUser/update-password.dto';
import { UpdateEmailDto } from './dto/update/byUser/update-email.dto';

import { RedisService } from './../redis/redis.service';

import * as bcrypt from 'bcrypt';

import type { SafeUser } from './types/safe.user.type';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User,
		private readonly redisService: RedisService
	) { }

	getSafeUser(user: User): SafeUser {
		let { id, email, username, fullName, visits, role, status } = user;
		let safeUser: SafeUser = { id, email, username, fullName, visits, role, status }
		return safeUser;
	}

	async create(session: Record<string, any>, createUserDto: CreateUserDto): Promise<SafeUser> {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(createUserDto.password, salt);
		let defaultedCreateUserDto = {
			username: createUserDto.username,
			fullName: createUserDto.fullName,
			email: createUserDto.email,
			password: hashedPassword,
		}

		let user: any;

		try {
			user = await this.userModel.create(defaultedCreateUserDto);
		} catch (error) {
			throw new ConflictException(error.name);
		}

		let safeUser = this.getSafeUser(user);

		this.redisService.initializeNewUserSession(session, safeUser);

		return safeUser;

	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<SafeUser> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) throw new NotFoundException('user not found');

		for (const key in updateUserDto) {
			user[key] = updateUserDto[key];
		}

		try {
			await user.save();
		} catch (error) {
			throw new ConflictException(error.name);
		}

		await this.redisService.updateSessionsByUserId(id, updateUserDto)

		return this.getSafeUser(user);
	}

	async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) throw new NotFoundException('user not found');

		let salt = await bcrypt.genSalt(10);

		let hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, salt);

		user.password = hashedPassword;

		await user.save();

		return;
	}


	async updateEmail(id: number, updateEmailDto: UpdateEmailDto): Promise<SafeUser> {
		let user = await this.update(id, updateEmailDto);

		if (!user) throw new NotFoundException('user not found');

		// todo email verification
		//
		return user;
	}

	async findAll(): Promise<SafeUser[]> {
		let allUsers = await this.userModel.findAll();

		let filteredUsers: SafeUser[] = allUsers.map(this.getSafeUser);

		return filteredUsers;
	}

	async findOne(id: number): Promise<SafeUser> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new NotFoundException('user not found');

		return this.getSafeUser(user);
	}

	async findOneByUsername(username: string): Promise<User> {
		let user = await this.userModel.findOne({
			where: {
				username,
			},
		});

		if (!user) throw new NotFoundException('user not found');

		return user;
	}

	async findAllMods(): Promise<SafeUser[]> {
		let mods = await this.userModel.findAll({
			where: {
				role: UserRole.MODERATOR
			}
		});

		let safeMods = mods.map(this.getSafeUser);

		return safeMods;
	}

	async findAllBanned(): Promise<SafeUser[]> {
		let banned = await this.userModel.findAll({
			where: {
				status: UserStatus.BANNED
			}
		});

		let safeBanned = banned.map(this.getSafeUser);

		return safeBanned;
	}

}
