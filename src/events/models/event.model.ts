import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { EventStatus } from './../enums/eventStatus.enum';
import { Participant } from './../../participants/models/participant.model';
import { Movie } from './../../movies/models/movie.model';
import { EventMovie } from './../../movies/models/eventMovie.model';
import { Feedback } from './../../feedbacks/models/feedback.model';


@Table
export class Event extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column
	title: string;

	@Column
	location: string;

	@Column
	description: string | null;

	@Column
	moderator: string;

	@Column({ type: DataType.INTEGER })
	placesTotal: number;

	@Column(
		{
			type: DataType.ENUM(
				Subtitles.RUSSIAN,
				Subtitles.ENGLISH,
				Subtitles.NATIVE,
				Subtitles.NONE
			)
		}
	)
	subtitlesSettings: Subtitles;

	@Column(
		{
			type: DataType.ENUM(
				Audio.RUSSIAN,
				Audio.ENGLISH,
				Audio.NATIVE
			)
		}
	)
	audioSettings: Audio;

	@Column(
		{
			type: DataType.ENUM(
				EventStatus.NOTPASSED,
				EventStatus.PASSED,
				EventStatus.CANCELED
			)
		}
	)
	status: EventStatus;

	@Column({ type: DataType.DATE })
	startTime: Date;

	@Column({ type: DataType.DATE })
	endTime: Date;

	@Column({ type: DataType.FLOAT })
	rating: number | null;

	@HasMany(() => Participant)
	participants: Participant[];

	@HasMany(() => Feedback)
	feedbacks: Feedback[];

	@BelongsToMany(() => Movie, () => EventMovie)
	movies: Movie[];

}
