import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MovierequestsModule } from './movierequests/movierequests.module';
import { ParticipantsModule } from './participants/participants.module';
import { EventfeedbacksModule } from './eventfeedbacks/eventfeedbacks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		EventsModule,
		MoviesModule,
		UsersModule,
		AuthModule,
		MovierequestsModule,
		ParticipantsModule,
		EventfeedbacksModule,
		SequelizeModule.forRoot({
			dialect: 'postgres',
			username: process.env.POSTGRES_DB_USER,
			database: process.env.POSTGRES_DB_DB,
			autoLoadModels: true,
			synchronize: true,
		})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }