import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './../src/app.module';

describe('Users', () => {
	let app: INestApplication;

	let adminCookie: string;
	let moderatorCookie: string;
	let experiencedCookie: string;
	let regularCookie: string;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		})
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('1st user (administrator)', () => {
		request(app.getHttpServer())
			.post('/auth/login')
			.set('Content-Type', 'application/json')
			.send({ username: 'george', password: 'password' })
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				adminCookie = res.headers['set-cookie'][0]; // Get the first Set-Cookie header
			})
	});

	/*it('get the user with id=1', () => {
		return request(app.getHttpServer())
			.get('/users/1')
			.expect(200)
	});*/

	/*it('PUT /update/1 + success', () => {
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
	*/


	afterAll(async () => {
		await app.close();
	});
})

