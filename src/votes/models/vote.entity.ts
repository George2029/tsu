import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './../../users/models/user.entity';
import { Request } from './../../requests/models/request.entity';

@Table({
	indexes: [{
		name: 'UNIQUE_userId_AND_movieRequestId',
		unique: true,
		fields: ['userId', 'requestId']
	}]
})
export class Vote extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		allowNull: false
	})
	value: boolean;

	@ForeignKey(() => User)
	@Column({
		allowNull: false
	})
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => Request)
	@Column({
		allowNull: false
	})
	requestId: number;

	@BelongsTo(() => Request)
	request: Request;
}
