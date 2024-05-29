import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService
	) { }

	async validateUserByEmail(email: string, password: string): Promise<true> {

		const user = await this.usersService.findOneByEmail(email);
		console.log(user);
		const hashedPassword = user.password;
		let valid = bcrypt.compare(password, hashedPassword);
		if (!valid) {
			throw new UnauthorizedException();
		}
		return true;

	}
}
