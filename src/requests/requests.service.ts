import { EventType } from './../events/enums/eventType.enum';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from './models/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
	constructor(
		@InjectModel(Request)
		private readonly requestModel: typeof Request,
	) { }

	async findOne(id: number): Promise<Request> {
		let request = await this.requestModel.findOne({
			where: {
				id,
			},
		});
		if (!request) throw new NotFoundException('request not found');
		return request;
	}


	async findAll(type?: EventType): Promise<Request[]> {
		let options = {
			order: ['startTime', 'createdAt'],
			where: undefined
		}
		if (type) {
			options.where = { type };
		}
		return this.requestModel.scope('preview').findAll(options);
	}

	create(userId: number, createRequestDto: CreateRequestDto): Promise<Request> {
		return this.requestModel.create({
			userId,
			...createRequestDto,
			endOfRequestTime: new Date(
				(new Date).setDate((new Date()).getDate() + 7)
			)

		});
	}

	async update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request> {
		let request = await this.requestModel.findOne({
			where: {
				id,
			},
		});

		if (!request) throw new NotFoundException();

		for (const key in updateRequestDto) {
			request[key] = updateRequestDto[key]
		}

		try {
			await request.save();
		} catch (error) {
			throw new ConflictException(error.name)
		}

		return request;
	}

	async remove(id: number): Promise<void> {
		const request = await this.findOne(id);
		if (!request) throw new NotFoundException();
		await request.destroy();
	}
}
