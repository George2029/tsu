import { Table, Column, BelongsTo, ForeignKey, Model, DataType } from 'sequelize-typescript';
import { Event } from './../../events/models/event.entity';
import { Participant } from './../../participants/models/participant.entity';

@Table
export class Feedback extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataType.INTEGER,
		validate: {
			min: 1,
			max: 10,
		},
		allowNull: false
	})
	rating: number;

	@Column
	review: string;

	@ForeignKey(() => Event)
	@Column({
		allowNull: false
	})
	eventId: number;

	@BelongsTo(() => Event)
	event: Event;

	@ForeignKey(() => Participant)
	@Column({
		unique: true,
		allowNull: false
	})
	participantId: number;

	@BelongsTo(() => Participant)
	participant: Participant;
}
