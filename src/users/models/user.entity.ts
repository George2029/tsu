import { Column, Model, Table, DataType, HasMany, Default } from 'sequelize-typescript';
import { UserRole } from './../enums/userRole.enum';
import { UserStatus } from './../enums/userStatus.enum';
import { Participant } from './../../participants/models/participant.entity';
import { MovieRequest } from './../../movierequests/models/movieRequest.entity';
import { Vote } from './../../votes/models/vote.entity';

@Table
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column({
		allowNull: false,
		unique: true
	})
	username: string;

	@Column
	fullName?: string;

	@Column({
		allowNull: false,
		unique: true
	})
	email: string;

	@Default(0)
	@Column({ type: DataType.INTEGER })
	visits: number;

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

	@Column
	password: string;

	@Default(UserStatus.UNVERIFIED)
	@Column({
		type: DataType.ENUM(
			UserStatus.UNVERIFIED,
			UserStatus.VERIFIED,
			UserStatus.BANNED
		)
	})
	status: UserStatus;

	@HasMany(() => Participant)
	participants: Participant[];

	@HasMany(() => MovieRequest)
	movieRequests: MovieRequest[];

	@HasMany(() => Vote)
	votes: Vote[];
}
