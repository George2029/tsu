import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';

const usersArray = [
	{
		username: 'username_1',
		fullName: 'fullName_1',
		email: 'email@gmail.com',
		visits: 2,
		role: UserRole.REGULAR,
		password: 'password',
		status: UserStatus.UNVERIFIED,
	},
	{
		username: 'username_2',
		fullName: 'fullName_2',
		email: 'email@yandex.ru',
		visits: 3,
		role: UserRole.EXPERIENCED,
		password: 'password1',
		status: UserStatus.VERIFIED,
	},
];

const oneUser = {
	username: 'username_1',
	fullName: 'fullName_1',
	email: 'email@gmail.com',
	visits: 2,
	role: UserRole.REGULAR,
	password: 'password',
	status: UserStatus.UNVERIFIED,
};

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
						remove: jest.fn(),
						destroy: jest.fn(() => oneUser),
					},
				},
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
			expect(users).toEqual(usersArray);
		});
	});

	describe('findOne()', () => {
		it('should get a single user', () => {
			const findSpy = jest.spyOn(model, 'findOne');
			expect(service.findOne('1'));
			expect(findSpy).toBeCalledWith({ where: { id: '1' } });
		});
	});

	describe('remove()', () => {
		it('should remove a user', async () => {
			const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
				destroy: jest.fn(),
			} as any);
			const retVal = await service.remove('2');
			expect(findSpy).toBeCalledWith({ where: { id: '2' } });
			expect(retVal).toBeUndefined();
		});
	});
});
