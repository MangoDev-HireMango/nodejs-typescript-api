import supertest from 'supertest';
import { UserModel } from '@models';
import { dbConnect, dbDisconnect } from '@dbConfig';
import statusCodes from '@constants/statusCodes';
import user from '@testData/user';
import app from '../../../app';

const request = supertest(app);

describe('USER', () => {
  beforeAll(async () => {
    await dbConnect();
    await UserModel.create({ ...user.existingUser });
  });
  afterAll(async () => {
    await dbDisconnect();
  });

  it('Should be able to create user account', async () => {
    const { body, status } = await request.post('/api/v1/users/sign-up').send({
      ...user.newUser,
    });
    expect(status).toBe(statusCodes.HTTP_CREATED);
    expect(body.data.username).toBe(user.newUser.username);
    expect(body).toHaveProperty('token');
  });

  it('Should be able to validate user account creation', async () => {
    const userClone = { ...user.newUser };

    const { body, status } = await request.post('/api/v1/users/sign-up').send({
      ...userClone,
      email: '',
      username: '',
    });

    expect(status).toBe(statusCodes.HTTP_BAD_REQUEST);
    expect(body.message).toBe('Validation failed');
  });

  it('Should not be able to create duplicate user account', async () => {
    const userClone = { ...user.existingUser };

    const { body, status } = await request.post('/api/v1/users/sign-up').send({
      ...userClone,
    });

    expect(status).toBe(statusCodes.HTTP_CONFLICT);
    expect(body.errors.email.length).toBeGreaterThan(3);
  });

  it('Should be able to log into user account and generate Token', async () => {
    const { body, status } = await request.post('/api/v1/users/login').send({
      accountIdentifier: user.existingUser.username,
      password: user.existingUser.password,
    });

    expect(status).toBe(statusCodes.HTTP_OK);
    expect(body).toHaveProperty('token');
    expect(body.data.username).toBe(user.existingUser.username);
  });

  it('Should not proceed with invalid credentials', async () => {
    const { body, status } = await request.post('/api/v1/users/login').send({
      accountIdentifier: `${new Date().getTime()}`,
      password: `${new Date().getTime()}`,
    });

    expect(status).toBe(statusCodes.HTTP_UNAUTHORIZED);
    expect(body.message).toBe('Invalid account credentials');
  });
});
