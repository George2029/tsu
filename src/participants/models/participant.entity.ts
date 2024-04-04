import { Table, Column, DataType, Model, BelongsTo, ForeignKey, HasOne, Default } from 'sequelize-typescript';
import { ParticipantStatus } from './../enums/participantStatus.enum';
import { Event } from './../../events/models/event.entity';
import { User } from './../../users/models/user.entity';
import { Feedback } from './../../feedbacks/models/feedback.entity';

@Table({
	indexes: [{
		name: 'UNIQUE_userId_AND_eventId',
		unique: true,
		fields: ['userId', 'eventId']
	}]
})
export class Participant extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Default(ParticipantStatus.ISGOING)
	@Column({
		type: DataType.ENUM(
			ParticipantStatus.ISGOING,
			ParticipantStatus.HASCANCELED,
			ParticipantStatus.ISABSENT,
			ParticipantStatus.ISPRESENT
		)
	})
	status: ParticipantStatus

	@Default(false)
	@Column
	notified: boolean

	@ForeignKey(() => Event)
	@Column
	eventId: number

	@BelongsTo(() => Event)
	event: Event;


	@ForeignKey(() => User)
	@Column
	userId: number

	@BelongsTo(() => User)
	user: User;

	@HasOne(() => Feedback)
	feedback: Feedback;
}
