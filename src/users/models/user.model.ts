import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { UserRole } from './../enums/userRole.enum';
import { UserStatus } from './../enums/userStatus.enum';
import { Participant } from './../../participants/models/participant.model';

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
	fullName: string | null;

	@Column({
		allowNull: false,
		unique: true
	})
	email: string;

	@Column({ type: DataType.INTEGER })
	visits: number;

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
}
