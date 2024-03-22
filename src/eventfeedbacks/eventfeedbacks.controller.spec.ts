import { Test, TestingModule } from '@nestjs/testing';
import { EventFeedbacksController } from './eventfeedbacks.controller';
import { EventFeedbacksService } from './eventfeedbacks.service';
import { CreateEventFeedbackDto } from './dto/create-eventFeedback.dto';

describe('EventfeedbacksController', () => {
	let controller: EventFeedbacksController;
	let service: EventFeedbacksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EventFeedbacksController],
			providers: [
				{
					provide: EventFeedbacksService,
					useValue: {
						create: jest
							.fn()
							.mockImplementation((eventFeedback: CreateEventFeedbackDto) =>
								Promise.resolve({
									id: '1', ...eventFeedback
								}),
							),
						findAll: jest.fn(),
						findOne: jest.fn(),
						remove: jest.fn()
					}
				}
			]
		}).compile();

		controller = module.get<EventFeedbacksController>(EventFeedbacksController);
		service = module.get<EventFeedbacksService>(EventFeedbacksService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
