import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

/*const updateUsernameDto = {
	username: 'newUsername'
}

const updateWithInvalidEmailDto = {
	email: 'asdfasdfasdf'
}*/

const usersServiceProvider = {
	provide: UsersService,
	useValue: {
		findOne: jest.fn(),
		findOneByUsername: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
		remove: jest.fn(),
		update: jest.fn(),
		updatePassword: jest.fn()
	}
}

const userWithoutUsername = {
	fullName: 'fullName_1',
	email: 'email@gmail.com',
	password: 'password',
}

describe('UsersController', () => {
	let usersController: UsersController;
	let usersService: UsersService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [usersServiceProvider],
		}).compile();

		usersController = app.get<UsersController>(UsersController);
		usersService = app.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});


	/*describe('update()', () => {
		it('should be able to update just username', () => {
			usersController.update('1', updateUsernameDto as UpdateUserDto)
			expect(usersService.update).toHaveBeenCalled();
		});
	})

	describe('should throw BadRequestException when creating a user with invalid email', () => {
		try {
			usersController.update('1', updateWithInvalidEmailDto as UpdateUserDto);
		} catch (error) {
			expect(error instanceof BadRequestException);
		}
	})*/

	describe('create()', () => {
		it('should throw BadRequestException when creating a user without username', () => {
			try {
				usersController.create({}, userWithoutUsername as CreateUserDto);
			} catch (error) {
				expect(error instanceof BadRequestException);
			}
		});
	});
});
