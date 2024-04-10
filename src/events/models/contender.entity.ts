import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Participant } from './../../participants/models/participant.entity';
import { ContestEventConfig } from './contestEventConfig.entity';

@Table({
	indexes: [{
		name: 'UNIQUE_contestEventConfigId_AND_participantId',
		unique: true,
		fields: ['contestEventConfigId', 'participantId']
	}]
})

export class Contender extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number;

	@Column
	winner: boolean;

	@ForeignKey(() => Participant)
	@Column
	participantId: number;

	@BelongsTo(() => Participant)
	participant: Participant;

	@ForeignKey(() => ContestEventConfig)
	@Column
	contestEventConfigId: number;

	@BelongsTo(() => ContestEventConfig)
	contestEventConfig: ContestEventConfig;
}
