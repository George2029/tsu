import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

const updateUsernameDto = {
	username: 'newUsername'
}

const updateWithInvalidEmailDto = {
	email: 'asdfasdfasdf'
}


describe('UsersController', () => {
	let usersController: UsersController;
	let usersService: UsersService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						update: jest.fn(),
						findAll: jest.fn(),
						findOne: jest.fn(),
						remove: jest.fn(),
					},
				},
			],
		}).compile();

		usersController = app.get<UsersController>(UsersController);
		usersService = app.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});


	describe('update()', () => {
		it('should be able to update just username', () => {
			usersController.update('1', updateUsernameDto as UpdateUserDto);
			expect(usersService.update).toHaveBeenCalled();
		});
	})

	describe('should throw BadRequestException when creating a user with invalid email', () => {
		try {
			usersController.update('1', updateWithInvalidEmailDto as UpdateUserDto);
		} catch (error) {
			expect(error instanceof BadRequestException);
		}
	})
});
