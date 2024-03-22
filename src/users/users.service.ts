import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private readonly userModel: typeof User,
	) { }

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userModel.findOne({ where: { id } });
		if (user) {
			for (const key in updateUserDto) {
				user[key] = updateUserDto[key];
			}
		}
		await user.save();
		return user;
	}

	async findAll(): Promise<User[]> {
		return this.userModel.findAll();
	}

	findOne(id: string): Promise<User> {
		return this.userModel.findOne({
			where: {
				id,
			},
		});
	}

	async remove(id: string): Promise<void> {
		const user = await this.findOne(id);
		await user.destroy();
	}
}
