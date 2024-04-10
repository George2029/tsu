import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Event } from './event.entity';

@Table
export class BoardGamesEventConfig extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column({
		allowNull: false
	})
	title: string;

	@Column
	description: string;

	@Column({
		allowNull: false
	})
	maxPlayers: number;

	@ForeignKey(() => Event)
	@Column({
		allowNull: false
	})
	eventId: number;

	@BelongsTo(() => Event)
	event: Event;

}
