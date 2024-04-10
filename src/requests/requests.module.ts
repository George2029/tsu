import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Request } from './models/request.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModRequestsController } from './mod.requests.controller';
import { ExperiencedRequestsController } from './experienced.requests.controller';

@Module({
	imports: [SequelizeModule.forFeature([Request])],
	controllers: [RequestsController, ModRequestsController, ExperiencedRequestsController],
	providers: [RequestsService]
})
export class RequestsModule { }
