import { Table, Column, BelongsTo, ForeignKey, Model, DataType } from 'sequelize-typescript';
import { Event } from './../../events/models/event.model';
import { Participant } from './../../participants/models/participant.model';

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
		}
	})
	rating: number;

	@Column
	review?: string;

	@ForeignKey(() => Event)
	@Column
	eventId: number;

	@BelongsTo(() => Event)
	event: Event;

	@ForeignKey(() => Participant)
	@Column
	participantId: number;

	@BelongsTo(() => Participant)
	participant: Participant;
}
