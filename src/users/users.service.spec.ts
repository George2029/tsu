import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';

const usersArray = [
	{
		id: undefined,
		username: 'username_1',
		fullName: 'fullName_1',
		password: 'asdf',
		email: 'email@gmail.com',
		visits: 2,
		role: UserRole.REGULAR,
		status: UserStatus.UNVERIFIED,
	},
	{
		id: undefined,
		username: 'username_2',
		password: 'asdf',
		fullName: 'fullName_2',
		email: 'email@yandex.ru',
		visits: 3,
		role: UserRole.EXPERIENCED,
		status: UserStatus.VERIFIED,
	},
];

const filteredUsersArray = [
	{
		id: undefined,
		username: 'username_1',
		fullName: 'fullName_1',
		email: 'email@gmail.com',
		visits: 2,
		role: UserRole.REGULAR,
		status: UserStatus.UNVERIFIED,
	},
	{
		id: undefined,
		username: 'username_2',
		fullName: 'fullName_2',
		email: 'email@yandex.ru',
		visits: 3,
		role: UserRole.EXPERIENCED,
		status: UserStatus.VERIFIED,
	},
];


describe('UserService', () => {
	let service: UsersService;
	let model: typeof User;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getModelToken(User),
					useValue: {
						findAll: jest.fn(() => usersArray),
						findOne: jest.fn(),
						create: jest.fn(), remove: jest.fn(),
					},
				},
				{
					provide: 'REDIS_CLIENT',
					useValue: {
						hSet: jest.fn(),
						hVals: jest.fn()
					}
				}
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		model = module.get<typeof User>(getModelToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll()', () => {
		it('should return an array of users', async () => {
			const users = await service.findAll();
			expect(users).toEqual(filteredUsersArray);
		});
	});

});
