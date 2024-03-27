import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './../src/app.module';

describe('Users', () => {
	let app: INestApplication;

	let user1 = { "id": 1, "username": "john", "fullName": null, "email": "george@gmail.com", "visits": 0, "role": "ADMINISTRATOR", "password": "$2b$10$VCM.jfXfmbrFBJFvfhXTuuoX9jyV67.eWAjt7MkvEdLGko1WorGiK", "status": "UNVERIFIED", "createdAt": "2024-03-25T13:33:48.517Z", "updatedAt": "2024-03-25T13:47:57.585Z" };

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		})
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('get the 1st user', () => {
		return request(app.getHttpServer())
			.get('/users/1')
			.expect(200)
			.expect(user => {
				return user.body.email === user1.email
			});
	});

	it('PUT /update/1 + success', () => {
		return request(app.getHttpServer())
			.put('/users/1')
			.set('Content-Type', 'application/json')
			.set('Cookie', ['session=s%3AMFNVGtDVOm68MIuBlujSt6QbUoPzmvs_.SQqTAzIJXF53Ft1Txzpk5B4AZilHNaxFDemHF5VmcLg'])
			.send()
	});

	it('PUT /update/1 : FAIL', () => {
		return request(app.getHttpServer())
			.put('/users/1')
			.expect(403);
	});


	afterAll(async () => {
		await app.close();
	});
})

