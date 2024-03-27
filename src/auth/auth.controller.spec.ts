import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
//import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
//import { LoginUserDto } from './dto/login.dto';


describe('AuthController', () => {
	let controller: AuthController;
	let usersService: UsersService;
	//let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						findOneByUsername: jest.fn(),
					}
				},
				{
					provide: 'REDIS_CLIENT',
					useValue: {
						hSet: jest.fn(),
						hVals: jest.fn()
					}
				}
			]
		}).compile();

		controller = module.get<AuthController>(AuthController);
		usersService = module.get<UsersService>(UsersService);
		//authService = module.get<AuthService>(AuthService);

	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

});
