import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from '../redis/redis.service';
import { RedisModule } from '../redis/redis.module';

const usersServiceProvider = {
	provide: UsersService,
	useValue: {
		create: jest.fn(),
		findOneByUsername: jest.fn()
	}
}

const redisServiceProvider = {
	provide: RedisService,
	useValue: {
		initializeNewUserSession: jest.fn(),
		updateSessionsByUserId: jest.fn()
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
	let redisService: RedisService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [RedisModule],
			controllers: [UsersController],
			providers: [usersServiceProvider, redisServiceProvider],
		}).compile();


		usersController = app.get<UsersController>(UsersController);
		usersService = app.get<UsersService>(UsersService);
		redisService = app.get<RedisService>(RedisService);
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});

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


/*const updateUsernameDto = {
 
	username: 'newUsername'
}

const updateWithInvalidEmailDto = {
	email: 'asdfasdfasdf'
}*/



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
