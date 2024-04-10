import { Table, Column, DataType, Model, BelongsTo, ForeignKey, HasOne, HasMany, Default } from 'sequelize-typescript';
import { ParticipantStatus } from './../enums/participantStatus.enum';
import { Event } from './../../events/models/event.entity';
import { User } from './../../users/models/user.entity';
import { Feedback } from './../../feedbacks/models/feedback.entity';
import { Contender } from '../../events/models/contender.entity';

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
		),
		allowNull: false
	})
	status: ParticipantStatus

	@Default(false)
	@Column
	notified: boolean

	@ForeignKey(() => Event)
	@Column({
		allowNull: false
	})
	eventId: number

	@BelongsTo(() => Event)
	event: Event;

	@ForeignKey(() => User)
	@Column({
		allowNull: false
	})
	userId: number

	@BelongsTo(() => User)
	user: User;

	@HasOne(() => Feedback)
	feedback: Feedback;

	@HasMany(() => Contender)
	contenders: Contender[];
}
