import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

describe('MoviesController', () => {
	let controller: MoviesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MoviesController],
			providers: [
				{
					provide: MoviesService,
					useValue: {
						create: jest
							.fn()
							.mockImplementation((user: CreateMovieDto) =>
								Promise.resolve({ id: '1', ...user }),
							),
						findAll: jest.fn().mockResolvedValue([
							{
								firstName: 'firstName #1',
								lastName: 'lastName #1',
							},
							{
								firstName: 'firstName #2',
								lastName: 'lastName #2',
							},
						]),
						findOne: jest.fn().mockImplementation((id: string) =>
							Promise.resolve({
								firstName: 'firstName #1',
								lastName: 'lastName #1',
								id,
							}),
						),
						remove: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<MoviesController>(MoviesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
