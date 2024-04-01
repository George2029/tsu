import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { Subtitles } from './enums/subtitles.enum';
import { Audio } from './enums/audio.enum';
import { EventStatus } from './enums/eventStatus.enum';
import { Event } from './models/event.model';
import { getModelToken } from '@nestjs/sequelize';

const eventsArray = [
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
];

const oneEvent = {
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

describe('EventsService', () => {
	let service: EventsService;
	let model: typeof Event;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EventsService,
				{
					provide: getModelToken(Event),
					useValue: {
						findAll: jest.fn(() => eventsArray),
						findOne: jest.fn(),
						update: jest.fn(),
						create: jest.fn(() => oneEvent),
						destroy: jest.fn(() => oneEvent),
					}
				}
			],
		}).compile();

		service = module.get<EventsService>(EventsService);
		model = module.get<typeof Event>(getModelToken(Event));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create()', () => {
		it('should successfully insert an event', () => {
			const oneUser = {
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
			expect(
				service.create({
					title: 'asdf',
					location: 'asdf',
					description: 'asdf',
					moderator: 'george',
					placesTotal: 10,
					subtitlesSettings: Subtitles.RUSSIAN,
					audioSettings: Audio.RUSSIAN,
					startTime: new Date('Mar 20 2024 19:00:00 GMT+7'),
					endTime: new Date('Mar 20 2024 22:00:00 GMT+7'),
				}),
			).toEqual(oneUser);
		});
	});
});
