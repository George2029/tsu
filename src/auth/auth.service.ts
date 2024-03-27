import { Injectable } from '@nestjs/common';
import { User } from './../users/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User
	) { }


	async validateUser(username: string, password: string): Promise<any> {

		const user = await this.userModel.findOne({
			where: { username }
		});

		const hashedPassword = user.password;
		const match = await bcrypt.compare(password, hashedPassword);

		if (match) {
			const { password, ...result } = user;
			return result;
		}
		return false;
	}
}
