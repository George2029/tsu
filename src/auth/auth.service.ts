import { Injectable } from '@nestjs/common';
import { User } from './../users/models/user.entity';
import { UsersService } from './../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService
	) { }

	async validateUser(username: string, password: string): Promise<any> {

		const user: User = await this.usersService.findOneByUsername(username);
		const hashedPassword = user.password;
		const match = await bcrypt.compare(password, hashedPassword);

		if (match) {
			const { password, ...result } = user;
			return result;
		}
		return false;
	}
}
