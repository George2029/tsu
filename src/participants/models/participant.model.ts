import { Table, Column, DataType, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { ParticipantStatus } from './../enums/participantStatus.enum';
import { Event } from './../../events/models/event.model';
import { User } from './../../users/models/user.model';
import { EventFeedback } from './../../eventfeedbacks/models/eventFeedback.model';

@Table
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

	@HasMany(() => EventFeedback)
	eventFeedbacks: EventFeedback[];
}
