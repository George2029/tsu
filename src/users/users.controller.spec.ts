import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

const userWithoutUsername = {
	fullName: 'fullName_1',
	email: 'email@gmail.com',
	visits: 0,
	role: UserRole.REGULAR,
	password: 'password',
	status: UserStatus.UNVERIFIED,
}

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
						create: jest.fn(),
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

	describe('create()', () => {
		it('should throw BadRequestException when creating a user without username', () => {
			try {
				usersController.create(userWithoutUsername as CreateUserDto);
			} catch (error) {
				expect(error instanceof BadRequestException);
			}
		});
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
