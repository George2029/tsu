import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
	let controller: MoviesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MoviesController],
			providers: [
				{
					provide: MoviesService,
					useValue: {
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
