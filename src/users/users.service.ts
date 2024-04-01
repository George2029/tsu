import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models/user.model';

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
			visits: 0,
			role: UserRole.REGULAR,
			password: hashedPassword,
			status: UserStatus.UNVERIFIED
		}

		let user: any;

		try {
			user = await this.userModel.create(defaultedCreateUserDto);
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		let safeUser = this.getSafeUser(user);

		this.redisService.initializeNewUserSession(session, safeUser);

		return safeUser;

	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) throw new BadRequestException();

		for (const key in updateUserDto) {
			user[key] = updateUserDto[key];
		}

		try {
			await user.save();
		} catch (error) {
			throw new ConflictException(error.errors[0].message);
		}

		await this.redisService.updateSessionsByUserId(id, updateUserDto)

		return this.getSafeUser(user);
	}

	async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) throw new BadRequestException();

		let salt = await bcrypt.genSalt(10);

		let hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, salt);

		user.password = hashedPassword;

		await user.save();

		return;
	}


	async updateEmail(id: string, updateEmailDto: UpdateEmailDto): Promise<SafeUser> {
		let user = await this.update(id, updateEmailDto);

		if (!user) throw new BadRequestException();

		// todo email verification
		//
		return user;
	}

	async findAll(): Promise<SafeUser[]> {
		let allUsers = await this.userModel.findAll();

		let filteredUsers: SafeUser[] = allUsers.map(this.getSafeUser);

		return filteredUsers;
	}

	async findOne(id: string): Promise<SafeUser> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new BadRequestException();

		return this.getSafeUser(user);
	}

	async findOneByUsername(username: string): Promise<User> {
		let user = await this.userModel.findOne({
			where: {
				username,
			},
		});

		if (!user) throw new BadRequestException();

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
