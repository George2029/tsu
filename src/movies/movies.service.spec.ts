import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';

describe('MoviesService', () => {
	let service: MoviesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MoviesService,
				{
					provide: getModelToken(Movie),
					useValue: {
						findAll: jest.fn(() => null),
						findOne: jest.fn(),
						update: jest.fn(),
						create: jest.fn(() => null),
						remove: jest.fn(),
						destroy: jest.fn(() => null),
					},
				},
			],
		}).compile();

		service = module.get<MoviesService>(MoviesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
