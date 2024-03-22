import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from './participants.service';
import { ParticipantStatus } from './enums/participantStatus.enum';
import { Participant } from './models/participant.model';
import { getModelToken } from '@nestjs/sequelize';

const participantsArray = [

	{
		status: ParticipantStatus.ISGOING,
		notified: true
	}, {
		status: ParticipantStatus.HASCANCELED,
		notified: false
	}
];

const oneParticipant = {
	status: ParticipantStatus.ISGOING,
	notified: true
}


describe('ParticipantsService', () => {
	let service: ParticipantsService;
	let model: typeof Participant;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ParticipantsService,
				{
					provide: getModelToken(Participant),
					useValue: {
						findAll: jest.fn(() => participantsArray),
						findOne: jest.fn(),
						create: jest.fn(() => oneParticipant),
						remove: jest.fn(),
						destroy: jest.fn(() => oneParticipant),
					}
				}

			],
		}).compile();

		service = module.get<ParticipantsService>(ParticipantsService);
		model = module.get<typeof Participant>(getModelToken(Participant));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create()', () => {
		it('should successfully insert a participant', () => {
			const oneParticipant = {
				status: ParticipantStatus.ISGOING,
				notified: true
			}
			expect(
				service.create({
					status: ParticipantStatus.ISGOING,
					notified: true
				}),
			).toEqual(oneParticipant);
		});
	});

	describe('findAll()', () => {
		it('should return an array of participants', async () => {
			const participants = await service.findAll();
			expect(participants).toEqual(participantsArray);
		});
	});

	describe('findOne()', () => {
		it('should get a single participant', () => {
			const findSpy = jest.spyOn(model, 'findOne');
			expect(service.findOne('1'));
			expect(findSpy).toBeCalledWith({
				where:
				{
					id: '1'
				}
			})
		});
	});

	describe('remove()', () => {
		it('should remove a participant', async () => {
			const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
				destroy: jest.fn(),
			} as any);
			const retVal = await service.remove('2');
			expect(findSpy).toBeCalledWith(
				{
					where: {
						id: '2'
					}
				});
			expect(retVal).toBeUndefined();
		});
	});
});
