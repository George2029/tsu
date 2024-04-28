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

import { google } from 'googleapis';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import type { UserSession } from './types/userSession.type';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService
	) { }

	toUserSession(user: User): UserSession {
		let { id, username, fullName, visits, wins, level, status, role, email, hue } = user;
		return {
			userId: id,
			username,
			fullName,
			visits,
			wins,
			level,
			status,
			role,
			email,
			hue
		}
	}

	hashCode(str: string) {
		let hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}

	getHue(str: string): number {
		return this.hashCode(str) % 360;
	}

	async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
		let userId = await this.redisService.getPasswordResetRequestUserId(resetPasswordDto.id, true);
		this.redisService.destroyAllSessions(+userId);
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(resetPasswordDto.password, salt);
		let user = await this.userModel.scope(null).findOne({
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

	async findOnePublicInfo(id: number) {
		return this.userModel.scope('public').findOne({
			where: {
				id
			}
		});
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


	async create(session: Record<string, any>, createUserDto: CreateUserDto): Promise<User> {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(createUserDto.password, salt);
		let defaultedCreateUserDto = {
			username: createUserDto.username,
			fullName: createUserDto.fullName,
			email: createUserDto.email,
			password: hashedPassword,
			hue: this.getHue(createUserDto.username)
		}

		let user: any;

		try {
			user = await this.userModel.create(defaultedCreateUserDto);
		} catch (error) {
			throw new ConflictException(error.name);
		}


		await this.redisService.initializeNewUserSession(session, user);
		let uuid = uuidv4();
		await this.redisService.saveVerificationId(user.id, uuid);
		this.sendVerificationEmail(createUserDto.email, uuid);
		return user;

	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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

		return user;
	}

	async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
		const user = await this.userModel.scope(null).findOne({ where: { id } });

		if (!user) throw new NotFoundException('user not found');

		let salt = await bcrypt.genSalt(10);

		let hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, salt);

		user.password = hashedPassword;

		await user.save();

		return true;
	}


	async updateEmail(id: number, updateEmailDto: UpdateEmailDto): Promise<User> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new NotFoundException('user not found');

		for (const key in updateEmailDto) {
			if (user[key] === updateEmailDto[key]) {
				return user;
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

		return user;
	}

	async findAll(): Promise<User[]> {
		return this.userModel.findAll();
	}

	async findOne(id: number): Promise<User> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new NotFoundException('user not found');

		return user;
	}

	async findOneByUsername(username: string): Promise<User> {
		let user = await this.userModel.scope(null).findOne({
			where: {
				username,
			},
			raw: true
		});

		if (!user) throw new NotFoundException('user not found');

		return user;
	}

	async findAllMods(): Promise<User[]> {
		return this.userModel.findAll({
			where: {
				role: UserRole.MODERATOR
			}
		});
	}

	async findAllBanned(): Promise<User[]> {
		return this.userModel.findAll({
			where: {
				status: UserStatus.BANNED
			}
		});
	}

}
