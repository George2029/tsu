import { Column, Model, Table, DataType, HasMany, Default, BelongsTo, ForeignKey, Scopes } from 'sequelize-typescript';

import { EventStatus } from './../enums/eventStatus.enum';
import { User } from './../../users/models/user.entity';

import { Participant } from './../../participants/models/participant.entity';
import { Feedback } from './../../feedbacks/models/feedback.entity';

import { MovieEventConfig } from './movieEventConfig.entity';
import { CustomEventConfig } from './customEventConfig.entity';
import { ContestEventConfig } from './contestEventConfig.entity';
import { BoardGamesEventConfig } from './boardGamesEventConfig.entity';

import { EventType } from './../enums/eventType.enum';

@Scopes(() => ({
	preview: {
		attributes: ['id', 'title', 'location', 'type', 'userId', 'createdAt', 'startTime'],
		raw: true,
		nest: true,
		order: ['id'],
		limit: 30,
		include: {
			model: User,
			attributes: ['hue', 'firstName']
		},

	}
}))
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
			),
			allowNull: false
		}
	)
	type: EventType;

	@Column({
		allowNull: false
	})
	title: string;

	@Column({
		allowNull: false
	})
	location: string;

	@Column
	description: string;

	@ForeignKey(() => User)
	@Column({
		allowNull: false
	})
	userId: number;

	@Column({
		allowNull: false
	})
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

	@Column({ type: DataType.DATE, allowNull: false })
	startTime: Date;

	@Column({ type: DataType.DATE, allowNull: false })
	endTime: Date;

	@Default(0)
	@Column({ type: DataType.FLOAT, allowNull: false })
	rating: number;

	@BelongsTo(() => User)
	user: User;

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
