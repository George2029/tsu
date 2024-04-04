import { Column, Model, Table, DataType, HasMany, Default } from 'sequelize-typescript';
import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { EventStatus } from './../enums/eventStatus.enum';
import { Participant } from './../../participants/models/participant.entity';
import { EventMovie } from './../../movies/models/eventMovie.entity';
import { Feedback } from './../../feedbacks/models/feedback.entity';


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

	@Default('TSU 12th building, 3rd floor, TISP, 22 room')
	@Column
	location: string;

	@Column
	description?: string;

	@Column
	moderator: string;

	@Default(10)
	@Column({ type: DataType.INTEGER })
	placesTotal: number;

	@Default(Subtitles.RUSSIAN)
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

	@Default(Subtitles.NATIVE)
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

	@Default(EventStatus.NOTPASSED)
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
	rating?: number;

	@HasMany(() => Participant)
	participants: Participant[];

	@HasMany(() => Feedback)
	feedbacks: Feedback[];

	@HasMany(() => EventMovie)
	eventMovies: EventMovie[];

}
