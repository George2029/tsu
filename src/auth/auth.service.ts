import { Injectable } from '@nestjs/common';
import { User } from './../users/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User
	) { }

	create(createUserDto: CreateUserDto): Promise<User> {
		return this.userModel.create({
			username: createUserDto.username,
			fullName: createUserDto.fullName,
			email: createUserDto.email,
			visits: createUserDto.visits,
			role: createUserDto.role,
			password: createUserDto.password,
			status: createUserDto.status
		});
	}
}
