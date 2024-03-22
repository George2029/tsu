import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantStatus } from './enums/participantStatus.enum';

const createParticipantDto: CreateParticipantDto = {
	status: ParticipantStatus.ISGOING,
	notified: true
}

describe('ParticipantsController', () => {
	let participantsController: ParticipantsController;
	let participantsService: ParticipantsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ParticipantsController],
			providers: [
				{
					provide: ParticipantsService,
					useValue: {
						create: jest
							.fn()
							.mockImplementation((participant: CreateParticipantDto) =>
								Promise.resolve({
									id: '1',
									...participant
								}),
							),
						findAll: jest.fn().mockResolvedValue([
							{
								status: ParticipantStatus.ISGOING,
								notified: true
							}, {
								status: ParticipantStatus.HASCANCELED,
								notified: false
							}
						]),
						findOne: jest.fn().mockImplementation((id: string) =>
							Promise.resolve({
								status: ParticipantStatus.ISGOING,
								notified: true,
								id
							})
						),
						remove: jest.fn(),
					}
				}
			]
		}).compile();

		participantsController = module.get<ParticipantsController>(ParticipantsController);
		participantsService = module.get<ParticipantsService>(ParticipantsService);
	});

	it('should be defined', () => {
		expect(participantsController).toBeDefined();
	});

	describe('create()', () => {
		it('should create a participant', () => {
			expect(participantsController.create(createParticipantDto)).resolves.toEqual({
				id: '1',
				...createParticipantDto,
			});
			expect(participantsService.create).toHaveBeenCalled();
			expect(participantsService.create).toHaveBeenCalledWith(createParticipantDto);

		})
	})

	describe('findAll()', () => {
		it('should find all participants', () => {
			participantsController.findAll();
			expect(participantsService.findAll).toHaveBeenCalled();
		})
	})

	describe('findOne()', () => {
		it('should find a participant', () => {
			participantsController.findOne('1');
			expect(participantsService.findOne).toHaveBeenCalled();
			expect(participantsController.findOne('1')).resolves.toEqual({
				status: ParticipantStatus.ISGOING,
				notified: true,
				id: '1'
			});
		})
	})

	describe('remove()', () => {
		it('should remove the participant', () => {
			participantsController.remove('2');
			expect(participantsService.remove).toHaveBeenCalled();
		});
	});
});
