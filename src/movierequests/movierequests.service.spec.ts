import { Test, TestingModule } from '@nestjs/testing';
import { MovieRequestsService } from './movierequests.service';
import { MovieRequest } from './models/movieRequest.model';
import { getModelToken } from '@nestjs/sequelize';

describe('MovieRequestsService', () => {
	let service: MovieRequestsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MovieRequestsService,
				{
					provide: getModelToken(MovieRequest),
					useValue: {
						findAll: jest.fn(() => null),
						findOne: jest.fn(),
						create: jest.fn(() => null),
						remove: jest.fn(),
						destroy: jest.fn(() => null),
					},
				},
			],
		}).compile();

		service = module.get<MovieRequestsService>(MovieRequestsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
