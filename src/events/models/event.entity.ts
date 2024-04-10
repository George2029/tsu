import { Column, Model, Table, DataType, HasMany, Default } from 'sequelize-typescript';

import { EventStatus } from './../enums/eventStatus.enum';

import { Participant } from './../../participants/models/participant.entity';
import { Feedback } from './../../feedbacks/models/feedback.entity';

import { MovieEventConfig } from './movieEventConfig.entity';
import { CustomEventConfig } from './customEventConfig.entity';
import { ContestEventConfig } from './contestEventConfig.entity';
import { BoardGamesEventConfig } from './boardGamesEventConfig.entity';

import { EventType } from './../enums/eventType.enum';

@Table
export class Event extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column(
		{
			type: DataType.ENUM(
				EventType.CUSTOM_EVENT,
				EventType.MOVIE_EVENT,
				EventType.BOARD_GAMES_EVENT,
				EventType.CONTEST_EVENT
			)
		}
	)
	type: EventType;

	@Column
	title: string;

	@Column
	location: string;

	@Column
	description: string;

	@Column
	moderator: string;

	@Column
	placesTotal: number;

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

	@Default(0)
	@Column({ type: DataType.FLOAT })
	rating: number;

	@HasMany(() => Participant)
	participants: Participant[];

	@HasMany(() => Feedback)
	feedbacks: Feedback[];

	@HasMany(() => MovieEventConfig)
	movieEventConfigs: MovieEventConfig[];

	@HasMany(() => CustomEventConfig)
	customEventConfigs: CustomEventConfig[];

	@HasMany(() => BoardGamesEventConfig)
	boardGamesEventConfigs: BoardGamesEventConfig[];

	@HasMany(() => ContestEventConfig)
	contestEventConfigs: ContestEventConfig[];
}
