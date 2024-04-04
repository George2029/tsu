import { Table, Model, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Event } from './../../events/models/event.entity';
import { Movie } from './movie.entity';

@Table
export class EventMovie extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ForeignKey(() => Event)
	@Column
	eventId: number;

	@BelongsTo(() => Event)
	event: Event;

	@ForeignKey(() => Movie)
	@Column
	movieId: number;

	@BelongsTo(() => Movie)
	movie: Movie;
}
