import { Test, TestingModule } from '@nestjs/testing';
import { MovieRequestsController } from './movierequests.controller';
import { MovieRequestsService } from './movierequests.service';
import { CreateMovieRequestDto } from './dto/create-movieRequest.dto';

describe('MovieRequestsController', () => {
	let controller: MovieRequestsController;
	let service: MovieRequestsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MovieRequestsController],
			providers: [
				{
					provide: MovieRequestsService,
					useValue: {
						create: jest
							.fn()
							.mockImplementation((user: CreateMovieRequestDto) =>
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

		controller = module.get<MovieRequestsController>(MovieRequestsController);
		service = module.get<MovieRequestsService>(MovieRequestsService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
