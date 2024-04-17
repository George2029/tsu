import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

import { User } from './models/user.entity';

import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UpdatePasswordDto } from './dto/update/byUser/update-password.dto';
import { UpdateEmailDto } from './dto/update/byUser/update-email.dto';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';

import { RedisService } from './../redis/redis.service';

import * as bcrypt from 'bcrypt';

import type { SafeUser } from './types/safe.user.type';
import { google } from 'googleapis';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService
	) { }

	async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
		let userId = await this.redisService.getPasswordResetRequestUserId(resetPasswordDto.id, true);
		this.redisService.destroyAllSessions(+userId);
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(resetPasswordDto.password, salt);
		let user = await this.userModel.findOne({
			where: {
				id: userId
			}
		});
		user['password'] = hashedPassword;
		try {
			await user.save();
		} catch (error) {
			throw new ConflictException(error.name);
		}
		return;
	}

	async doesPasswordResetRequestIdExist(id: string): Promise<boolean> {
		let exists = await this.redisService.getPasswordResetRequestUserId(id);
		return !!exists;
	}

	async resetPasswordRequest(resetPasswordRequestDto: ResetPasswordRequestDto): Promise<{ email: string }> {
		let user = await this.findOneByUsername(resetPasswordRequestDto.username)

		if (!user) throw new BadRequestException();

		let { email } = user;

		let uuid = uuidv4();

		this.sendPasswordResetLink(email, uuid);

		this.redisService.savePasswordResetRequestId(uuid, user.id);

		let obscuredEmail = email.split('');

		let atIndex = email.indexOf('@');

		for (let i = 2; i < atIndex; i++) {
			obscuredEmail[i] = '*';
		};

		return { email: obscuredEmail.join('') }
	}


	async auth(): Promise<any> {
		return google.auth.fromJSON({
			type: this.configService.get<string>('GOOGLE_TYPE'),
			client_id: this.configService.get<string>('GOOGLE_CLIENT_ID'),
			client_secret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
			refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN')
		});
	}

	async sendPasswordResetLink(to: string, uuid: string): Promise<any> {
		let t1 = performance.now();
		let auth = await this.auth();
		const gmail = google.gmail({ version: 'v1', auth });
		console.log('to:', to, 'uuid:', uuid);
		const emailLines = [
			`From: ${this.configService.get<string>('GOOGLE_ACCOUNT_EMAIL_ADDRESS')}`,
			`To: ${to}`,
			'Content-type: text/html;charset=iso-8859-1',
			'MIME-Version: 1.0',
			'Subject: TSU Events Password Reset',
			'',
			`Follow this link to reset password at TSU Events: http://localhost:3001/account/resetPassword/${uuid} </br>It lasts for 10 min.`
		];

		const email = emailLines.join('\r\n').trim();

		const base64Email = Buffer.from(email).toString('base64');

		let msg = await gmail.users.messages.send({
			userId: 'me',
			requestBody: {
				raw: base64Email
			}
		});
		let t2 = performance.now();
		console.log(t2 - t1);
		console.log(msg.status);
	}

	async sendVerificationEmail(to: string, uuid: string): Promise<any> {
		let t1 = performance.now();
		let auth = await this.auth();
		const gmail = google.gmail({ version: 'v1', auth });
		console.log('to:', to, 'uuid:', uuid);
		const emailLines = [
			`From: ${this.configService.get<string>('GOOGLE_ACCOUNT_EMAIL_ADDRESS')}`,
			`To: ${to}`,
			'Content-type: text/html;charset=iso-8859-1',
			'MIME-Version: 1.0',
			'Subject: TSU Events Account Verification',
			'',
			`Follow this link to verify your account at TSU Events: http://localhost:3001/account/verify/${uuid}`
		];

		const email = emailLines.join('\r\n').trim();

		const base64Email = Buffer.from(email).toString('base64');

		let msg = await gmail.users.messages.send({
			userId: 'me',
			requestBody: {
				raw: base64Email
			}
		});
		let t2 = performance.now();
		console.log(t2 - t1);
		console.log(msg.status);
	}

	async verifyUser(id: number, uuid: string): Promise<boolean> {
		let result = await this.redisService.checkVerificationId(id, uuid);
		if (!result) return false;
		await this.update(id, { status: UserStatus.VERIFIED });
		return true;

	}

	getSafeUser(user: User): SafeUser {
		let { id, email, username, wins, level, fullName, visits, role, status } = user;
		let safeUser: SafeUser = { id, email, username, fullName, visits, wins, level, role, status }
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

		await this.redisService.initializeNewUserSession(session, safeUser);
		let uuid = uuidv4();
		await this.redisService.saveVerificationId(user.id, uuid);
		this.sendVerificationEmail(createUserDto.email, uuid);
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

	async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) throw new NotFoundException('user not found');

		let salt = await bcrypt.genSalt(10);

		let hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, salt);

		user.password = hashedPassword;

		await user.save();

		return true;
	}


	async updateEmail(id: number, updateEmailDto: UpdateEmailDto): Promise<SafeUser> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new NotFoundException('user not found');

		for (const key in updateEmailDto) {
			if (user[key] === updateEmailDto[key]) {
				return this.getSafeUser(user);
			}
			user[key] = updateEmailDto[key];
			user.status = UserStatus.UNVERIFIED;
		}

		try {
			await user.save();
		} catch (error) {
			throw new ConflictException(error.name);
		}

		await this.redisService.updateSessionsByUserId(id, { ...updateEmailDto, status: UserStatus.UNVERIFIED })
		let uuid = uuidv4();
		await this.redisService.saveVerificationId(id, uuid);
		this.sendVerificationEmail(updateEmailDto.email, uuid);

		return this.getSafeUser(user);
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
