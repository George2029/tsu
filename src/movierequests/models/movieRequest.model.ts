import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Subtitles } from './../enums/subtitles.enum';
import { Audio } from './../enums/audio.enum';
import { RequestStatus } from './../enums/requestStatus.enum';
import { Vote } from './vote.model';

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
	location: string;

	@Column
	description: string | null;

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
				RequestStatus.NOTPASSED,
				RequestStatus.ACCEPTED,
				RequestStatus.REJECTED,
				RequestStatus.CANCELED
			)
		}
	)
	eventStatus: RequestStatus;

	@Column({ type: DataType.DATE })
	startTime: Date;

	@Column({ type: DataType.DATE })
	endTime: Date;

	@HasMany(() => Vote)
	votes: Vote[];
}
