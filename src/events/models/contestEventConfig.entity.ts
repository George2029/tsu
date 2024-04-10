import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Event } from './event.entity';
import { Contender } from './contender.entity';

@Table
export class ContestEventConfig extends Model {
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
	description?: string;

	@Column({
		allowNull: false
	})
	rules: string;

	@Column({
		allowNull: false
	})
	prize: string;

	@ForeignKey(() => Event)
	@Column({
		allowNull: false
	})
	eventId: number;

	@BelongsTo(() => Event)
	event: Event;

	@HasMany(() => Contender)
	contender: Contender;

}
