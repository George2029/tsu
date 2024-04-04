import { Column, Model, Table, DataType, HasMany, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { MovieRequestStatus } from './../enums/movieRequestStatus.enum';
import { Vote } from './../../votes/models/vote.entity';
import { User } from './../../users/models/user.entity';

@Table
export class MovieRequest extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column
	URL: string;

	@Column
	title: string;

	@Column
	description?: string;

	@Default(`TSU 12th building`)
	@Column
	location: string;

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

	@Default(Audio.NATIVE)
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

	@Default(MovieRequestStatus.NOTPASSED)
	@Column(
		{
			type: DataType.ENUM(
				MovieRequestStatus.NOTPASSED,
				MovieRequestStatus.ACCEPTED,
				MovieRequestStatus.REJECTED,
				MovieRequestStatus.CANCELED)
		}
	)
	status: MovieRequestStatus;

	@Column({ type: DataType.DATE })
	startTime: Date;

	@Column({ type: DataType.DATE })
	endTime: Date;

	@HasMany(() => Vote)
	votes: Vote[];

	@ForeignKey(() => User)
	@Column
	userId: number

	@BelongsTo(() => User)
	user: User;
}
