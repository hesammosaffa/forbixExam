import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from './../src/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('/create-user (POST)', () => {
    const createUserDto: CreateUserDto = { name: 'hesam', email: 'hesam.mosaffa.1251@gmail.com' };
    return request(app.getHttpServer())
      .post('/create-user')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(createUserDto.name);
        expect(res.body.email).toBe(createUserDto.email);
      });
  });

  it('/get-users/:id (GET)', async () => {
    const createUserDto: CreateUserDto = { name: 'hesam', email: 'hesam.mosaffa.1251@gmail.com' };
    const user = await request(app.getHttpServer())
      .post('/create-user')
      .send(createUserDto)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/get-users/${user.body._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(createUserDto.name);
        expect(res.body.email).toBe(createUserDto.email);
      });
  });

  it('/delete-user/:id (DELETE)', async () => {
    const createUserDto: CreateUserDto = { name: 'hesam', email: 'hesam.mosaffa.1251@gmail.com' };
    const user = await request(app.getHttpServer())
      .post('/create-user')
      .send(createUserDto)
      .expect(201);

    return request(app.getHttpServer())
      .delete(`/delete-user/${user.body._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('User and associated companies deleted successfully');
      });
  });

  it('/update-user/:id (PUT)', async () => {
    const createUserDto: CreateUserDto = { name: 'hesam', email: 'hesam.mosaffa.1251@gmail.com' };
    const user = await request(app.getHttpServer())
      .post('/create-user')
      .send(createUserDto)
      .expect(201);

    const updateUserDto: Partial<CreateUserDto> = { name: 'Hesameddin Mosaffa' };

    return request(app.getHttpServer())
      .put(`/update-user/${user.body._id}`)
      .send(updateUserDto)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(updateUserDto.name);
        expect(res.body.email).toBe(createUserDto.email);
      });
  });

  it('/get-all-users (GET)', async () => {
    return request(app.getHttpServer())
      .get('/get-all-users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
