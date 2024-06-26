import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

console.log(process.env.REDIS_URL);
let redisClient = createClient({ url: process.env.REDIS_URL });
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
			cookie: {
				maxAge: 1000 * 3600 * 24 * 30
			}
		}),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		}),
	);
	const config = new DocumentBuilder()
		.setTitle('Events API')
		.setDescription('The Events API description')
		.setVersion('1.0')
		.addTag('events')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}

bootstrap();
