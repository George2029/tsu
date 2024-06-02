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

	async exists(field: string, value: string): Promise<true> {
		let where = {};
		where[field] = value;
		console.log(where);

		let user = await this.userModel.findOne({
			attributes: ['id'],
			raw: true,
			where
		});

		if (!user) {
			throw new NotFoundException();
		}
		return true;
	}

	async emailVerificationCode(email: string): Promise<void> {
		let code = String(Math.random()).slice(2, 6);
		console.log('verification code: ', code);
		await this.redisService.saveVerificationCode(email, code);
		return this.email(email, 'Verification Code', code)
	}

	async verifyCode(email: string, code: string): Promise<boolean> {
		return this.redisService.checkVerificationCode(email, code);
	}

	async saveEmailUpdateAttempt(id: number, email: string): Promise<void> {
		let uuid = uuidv4();
		let key = `${id}:${uuid}`;
		await this.email(email, 'Uni Events Verification Link', `Follow this link to verify your account at Uni Events: https://${this.configService.get<string>('DOMAIN_NAME')}/account/verifyEmail/${uuid}`);
		this.redisService.saveEmailUpdateAttempt(key, email);
	}

	async verifyEmailUpdateAttempt(id: number, uuid: string): Promise<void> {
		let key = `${id}:${uuid}`;
		let email: string = await this.redisService.getEmailUpdateAttempt(key);
		await this.updateEmail(id, email);
	}

	async getUserPreview(id: number): Promise<User> {
		let user = await this.userModel.scope('preview').findOne({
			where: {
				id
			}
		});
		if (!user) throw new NotFoundException('user not found')
		return user;
	}

	toUserSession(user: User): UserSession {
		let { id, createdAt, username, firstName, visits, wins, level, status, role, email, hue } = user;
		return {
			userId: id,
			username,
			firstName,
			visits,
			wins,
			level,
			status,
			role,
			email,
			hue,
			createdAt
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
		return Math.abs(this.hashCode(str)) % 360;
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
		let user = await this.findOneByEmail(resetPasswordRequestDto.email)

		if (!user) {
			throw new BadRequestException();
		}

		let { email } = user;

		let uuid = uuidv4();

		this.email(email, 'TSU Events Password Reset', `Follow this link to reset password at TSU Events: https://${this.configService.get<string>('DOMAIN_NAME')}/resetPassword/${uuid} It lasts for 10 min.`);

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

	async findOnePublicInfo(id: number) {
		let user = await this.userModel.scope('public').findOne({
			where: {
				id
			}
		});
		if (!user) throw new NotFoundException('user not found');
		return user;
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
			firstName: createUserDto.firstName,
			email: createUserDto.email,
			password: hashedPassword,
			hue: this.getHue(createUserDto.username)
		}

		let user: User;

		try {
			user = await this.userModel.create(defaultedCreateUserDto);
		} catch (error) {
			throw new ConflictException(error.name);
		}

		let userSession = this.toUserSession(user);
		await this.redisService.initializeNewUserSession(session, userSession);
		let uuid = uuidv4();
		await this.redisService.saveVerificationId(user.id, uuid);
		return user;

	}

	async incrementVisits(id: number) {
		const user = await this.userModel.findOne({ where: { id } });
		if (!user) throw new NotFoundException('user not found');

		if (user.role === UserRole.REGULAR) {
			user.role = UserRole.EXPERIENCED;
		}
		user.visits++;
		user.save();
		this.redisService.updateSessionsByUserId(id, { visits: user.visits, role: user.role });
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


	async updateEmail(id: number, newEmail: string): Promise<User> {
		let user = await this.userModel.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new NotFoundException('user not found');

		user.email = newEmail;

		try {
			await user.save();
		} catch (error) {
			throw new ConflictException(error.name);
		}

		await this.redisService.updateSessionsByUserId(id, { email: newEmail })
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

	async findOneByEmail(email: string): Promise<User> {
		let user = await this.userModel.scope(null).findOne({
			where: {
				email,
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


	async email(to: string, subject: string, text: string): Promise<void> {

		let auth = await this.auth();
		const gmail = google.gmail({ version: 'v1', auth });

		const emailLines = [
			`From: ${this.configService.get<string>('GOOGLE_ACCOUNT_EMAIL_ADDRESS')}`,
			`To: ${to}`,
			'Content-type: text/html;charset=iso-8859-1',
			'MIME-Version: 1.0',
			`Subject: ${subject}`,
			'',
			text
		];
		const email = emailLines.join('\r\n').trim();
		const base64Email = Buffer.from(email).toString('base64');
		let msg: any;
		try {
			msg = await gmail.users.messages.send({
				userId: 'me',
				requestBody: {
					raw: base64Email
				}
			});
		} catch (err) {
			console.log(`email sending failed: `, err);
			throw new BadRequestException('email failed');
		}

		console.log(`email status: `, msg.status);

	}

	async removeUser(id: number): Promise<void> {
		await this.userModel.destroy({ where: { id } });
		await this.redisService.destroyAllSessions(id);
	}

}
