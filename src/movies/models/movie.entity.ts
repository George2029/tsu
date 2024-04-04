import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { EventMovie } from './eventMovie.entity';

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

	@HasMany(() => EventMovie)
	eventMovie: EventMovie[];
}
