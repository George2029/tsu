import { Controller, Post, Param } from '@nestjs/common'
import { Roles } from './../roles.decorator';
import { UsersService } from './users.service';

@Controller('admin/users')
export class AdminUsersController {
	constructor(
		private readonly usersService: UsersService) { }

	@Roles(['ADMINISTRATOR'])
	@Post('mod/:id')
	async mod(@Param('id') id: string): Promise<boolean> {
		return true;
	}
}
