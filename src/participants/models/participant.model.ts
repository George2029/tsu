import { Table, Column, DataType, Model, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { ParticipantStatus } from './../enums/participantStatus.enum';
import { Event } from './../../events/models/event.model';
import { User } from './../../users/models/user.model';
import { Feedback } from './../../feedbacks/models/feedback.model';

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

	@Column({
		type: DataType.ENUM(
			ParticipantStatus.ISGOING,
			ParticipantStatus.HASCANCELED,
			ParticipantStatus.ISABSENT,
			ParticipantStatus.ISPRESENT
		)
	})
	status: ParticipantStatus

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
