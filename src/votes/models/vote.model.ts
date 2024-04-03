import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './../../users/models/user.model';
import { MovieRequest } from './../../movierequests/models/movieRequest.model';

@Table({
	indexes: [{
		name: 'UNIQUE_userId_AND_movieRequestId',
		unique: true,
		fields: ['userId', 'movieRequestId']
	}]
})
export class Vote extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column
	value: boolean;

	@ForeignKey(() => User)
	@Column
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => MovieRequest)
	@Column
	movieRequestId: number;

	@BelongsTo(() => MovieRequest)
	movieRequest: MovieRequest;
}
