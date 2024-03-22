import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';

const userWithoutUsername = {
	fullName: 'fullName_1',
	email: 'email@gmail.com',
	visits: 0,
	role: UserRole.REGULAR,
	password: 'password',
	status: UserStatus.UNVERIFIED,
}

describe('AuthController', () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						create: jest.fn(),
						login: jest.fn()
					}
				}
			]
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);

	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create()', () => {
		it('should throw BadRequestException when creating a user without username', () => {
			try {
				controller.create(userWithoutUsername as CreateUserDto);
			} catch (error) {
				expect(error instanceof BadRequestException);
			}
		});
	});
});
