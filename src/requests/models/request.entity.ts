import { Column, Model, Table, DataType, HasMany, ForeignKey, BelongsTo, Default, Scopes } from 'sequelize-typescript';
import { RequestStatus } from './../enums/requestStatus.enum';
import { Vote } from './../../votes/models/vote.entity';
import { User } from './../../users/models/user.entity';
import { EventType } from './../../events/enums/eventType.enum';

@Scopes(() => ({
	preview: {
		attributes: ['id', 'title', 'userId', 'type', 'location', 'startTime', 'createdAt'],
		raw: true
	}
}))
@Table
export class Request extends Model {
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
	description: string;

	@Column({
		allowNull: false
	})
	location: string;

	@Default(RequestStatus.NOTPASSED)
	@Column(
		{
			type: DataType.ENUM(
				RequestStatus.NOTPASSED,
				RequestStatus.ACCEPTED,
				RequestStatus.REJECTED,
				RequestStatus.CANCELED),
			allowNull: false
		}
	)
	status: RequestStatus;

	@Column(
		{
			type: DataType.ENUM(
				EventType.CUSTOM_EVENT,
				EventType.MOVIE_EVENT,
				EventType.BOARD_GAMES_EVENT,
				EventType.CONTEST_EVENT),
			allowNull: false
		}
	)
	type: EventType;

	@Column({
		type: DataType.DATE,
		allowNull: false
	})
	startTime: Date;

	@Column({
		type: DataType.DATE,
		allowNull: false
	})
	endTime: Date;

	@Column({
		type: DataType.DATE,
		allowNull: false
	})
	endOfRequestTime: Date;

	@HasMany(() => Vote)
	votes: Vote[];

	@ForeignKey(() => User)
	@Column({
		allowNull: false
	})
	userId: number

	@BelongsTo(() => User)
	user: User;
}
