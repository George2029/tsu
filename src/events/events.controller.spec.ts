import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Subtitles } from './enums/subtitles.enum';
import { Audio } from './enums/audio.enum';
import { EventStatus } from './enums/eventStatus.enum';

const createEventDto: CreateEventDto = {
	title: 'asdf',
	location: 'asdf',
	description: 'asdf',
	moderator: 'george',
	placesTotal: 10,
	subtitlesSettings: Subtitles.RUSSIAN,
	audioSettings: Audio.RUSSIAN,
	status: EventStatus.NOTPASSED,
	startTime: new Date('Mar 20 2024 19:00:00 GMT+7'),
	endTime: new Date('Mar 20 2024 22:00:00 GMT+7'),
	rating: 7.2
};

describe('EventsController', () => {
	let eventsController: EventsController;
	let eventsService: EventsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [EventsController],
			providers: [
				{
					provide: EventsService,
					useValue: {
						create: jest
							.fn()
							.mockImplementation((event: CreateEventDto) =>
								Promise.resolve({ id: '1', ...event })
							),

						findAll: jest.fn().mockResolvedValue([

							{
								title: 'asdf',
								location: 'asdf',
								description: 'asdf',
								moderator: 'george',
								placesTotal: 10,
								subtitlesSettings: Subtitles.RUSSIAN,
								audioSettings: Audio.RUSSIAN,
								status: EventStatus.NOTPASSED,
								startTime: new Date('Mar 20 2024 19:00:00 GMT+7'),
								endTime: new Date('Mar 20 2024 22:00:00 GMT+7'),
								rating: 7.2
							},

							{
								title: 'asdf 2',
								location: 'asdf 2',
								description: 'asdf 2',
								moderator: 'george 2',
								placesTotal: 15,
								subtitlesSettings: Subtitles.ENGLISH,
								audioSettings: Audio.ENGLISH,
								status: EventStatus.PASSED,
								startTime: new Date('Mar 21 2024 19:00:00 GMT+7'),
								endTime: new Date('Mar 21 2024 22:00:00 GMT+7'),
								rating: 6.8
							},
						]),

						findOne: jest.fn().mockImplementation((id: string) =>
							Promise.resolve({
								title: 'asdf',
								location: 'asdf',
								description: 'asdf',
								moderator: 'george',
								placesTotal: 10,
								subtitlesSettings: Subtitles.RUSSIAN,
								audioSettings: Audio.RUSSIAN,
								status: EventStatus.NOTPASSED,
								startTime: new Date('Mar 20 2024 19:00:00 GMT+7'),
								endTime: new Date('Mar 20 2024 22:00:00 GMT+7'),
								rating: 7.2,
								id,
							}),
						),

						remove: jest.fn(),
					}
				}
			]
		}).compile();

		eventsController = app.get<EventsController>(EventsController);
		eventsService = app.get<EventsService>(EventsService);
	});

	it('should be defined', () => {
		expect(eventsController).toBeDefined();
	});

	describe('create()', () => {
		it('should create an event', () => {
			expect(eventsController.create(createEventDto)).resolves.toEqual({
				id: '1',
				...createEventDto,
			});
			expect(eventsService.create).toHaveBeenCalled();
			expect(eventsService.create).toHaveBeenCalledWith(createEventDto);
		});
	});

	describe('findAll()', () => {
		it('should find all events ', () => {
			eventsController.findAll();
			expect(eventsService.findAll).toHaveBeenCalled();
		});
	});

	describe('findOne()', () => {
		it('should find an event', () => {
			eventsController.findOne('1');
			expect(eventsService.findOne).toHaveBeenCalled();
			expect(eventsController.findOne('1')).resolves.toEqual({
				title: 'asdf',
				location: 'asdf',
				description: 'asdf',
				moderator: 'george',
				placesTotal: 10,
				subtitlesSettings: Subtitles.RUSSIAN,
				audioSettings: Audio.RUSSIAN,
				status: EventStatus.NOTPASSED,
				startTime: new Date('Mar 20 2024 19:00:00 GMT+7'),
				endTime: new Date('Mar 20 2024 22:00:00 GMT+7'),
				rating: 7.2,
				id: '1',
			});
		});
	});

	describe('remove()', () => {
		it('should remove the user', () => {
			eventsController.remove('2');
			expect(eventsService.remove).toHaveBeenCalled();
		});
	});

});
