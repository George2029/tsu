import { Test, TestingModule } from '@nestjs/testing';
import { EventFeedbacksService } from './eventfeedbacks.service';
import { getModelToken } from '@nestjs/sequelize';
import { EventFeedback } from './models/eventFeedback.model';

describe('EventfeedbacksService', () => {
	let service: EventFeedbacksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EventFeedbacksService,
				{
					provide: getModelToken(EventFeedback),
					useValue: {
						findAll: jest.fn(),
						findOne: jest.fn(),
						create: jest.fn(),
						remove: jest.fn(),
						destroy: jest.fn()
					}
				}],
		}).compile();

		service = module.get<EventFeedbacksService>(EventFeedbacksService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
