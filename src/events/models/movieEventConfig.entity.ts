import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';

import { Event } from './event.entity';


@Table
export class MovieEventConfig extends Model {
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

	@Column({
		allowNull: false
	})
	duration: string;

	@Column
	description: string;

	@Column(
		{
			type: DataType.ENUM(
				Subtitles.RUSSIAN,
				Subtitles.ENGLISH,
				Subtitles.NATIVE,
				Subtitles.NONE
			),
			allowNull: false
		}
	)
	subtitles: Subtitles;

	@Column(
		{
			type: DataType.ENUM(
				Audio.RUSSIAN,
				Audio.ENGLISH,
				Audio.NATIVE
			),
			allowNull: false
		}
	)
	audio: Audio;

	@ForeignKey(() => Event)
	@Column({
		allowNull: false
	})
	eventId: number;

	@BelongsTo(() => Event)
	event: Event;

}
