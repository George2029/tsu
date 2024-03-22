import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Event } from './../../events/models/event.model';
import { Movie } from './movie.model';

@Table
export class EventMovie extends Model {
	@ForeignKey(() => Event)
	@Column
	evenId: number;

	@ForeignKey(() => Movie)
	@Column
	movieId: number;
}
