import { Column, Model, Table, DataType, HasMany, Default, DefaultScope, Scopes } from 'sequelize-typescript';
import { UserRole } from './../enums/userRole.enum';
import { UserStatus } from './../enums/userStatus.enum';
import { Participant } from './../../participants/models/participant.entity';
import { Request } from './../../requests/models/request.entity';
import { Vote } from './../../votes/models/vote.entity';
import { Event } from './../../events/models/event.entity';


@DefaultScope(() => ({
	attributes: {
		exclude: ['password'],
	}
}))
@Scopes(() => ({
	public: {
		attributes: ['hue', 'username', 'firstName', 'visits', 'wins', 'level', 'createdAt'],
		raw: true,
	},
	preview: {
		attributes: ['firstName', 'hue'],
		raw: true,
	}
}))
@Table
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column({
		unique: true
	})
	vkId: number;

	@Column({
		unique: true
	})
	tsuId: number;

	@Column({
		allowNull: false,
		unique: true
	})
	username: string;

	@Column({
		allowNull: false
	})
	hue: number;

	@Column({
		allowNull: false
	})
	firstName: string;

	@Column({
		allowNull: false,
		unique: true
	})
	email: string;

	@Default(0)
	@Column({
		allowNull: false
	})
	visits: number;

	@Default(0)
	@Column({
		allowNull: false
	})
	wins: number;

	@Default(1)
	@Column({
		allowNull: false
	})
	level: number;

	@Default(UserRole.REGULAR)
	@Column({
		type: DataType.ENUM(
			UserRole.REGULAR,
			UserRole.EXPERIENCED,
			UserRole.MODERATOR,
			UserRole.ADMINISTRATOR
		)
	})
	role: UserRole;

	@Column({
		allowNull: false
	})
	password: string;

	@Default(UserStatus.VERIFIED)
	@Column({
		type: DataType.ENUM(
			UserStatus.UNVERIFIED,
			UserStatus.VERIFIED,
			UserStatus.BANNED
		),
		allowNull: false
	})
	status: UserStatus;

	@HasMany(() => Event)
	events: Event[];

	@HasMany(() => Participant)
	participants: Participant[];

	@HasMany(() => Request)
	requests: Request[];

	@HasMany(() => Vote)
	votes: Vote[];
}
