import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Event } from './../../events/models/event.model';
import { EventMovie } from './eventMovie.model';

@Table
export class Movie extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column
	language: string;

	@Column
	URL: string;

	@Column({
		type: DataType.TIME
	})
	duration: Date;

	@BelongsToMany(() => Event, () => EventMovie)
	events: Event[];
}
