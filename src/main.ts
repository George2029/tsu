import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
	client: redisClient,
	prefix: 'myapp:',
})

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(
		session({
			store: redisStore,
			secret: 'my-secret',
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		}),
	);
	await app.listen(3000);
}

bootstrap();
