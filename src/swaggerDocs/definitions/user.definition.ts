import { faker } from '@faker-js/faker';

export default {
  CreateUserSchema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      firstName: { type: 'string', example: faker.name.firstName() },
      lastName: { type: 'string', example: faker.name.lastName() },
      middleName: { type: 'string', example: faker.name.middleName() },
      email: { type: 'string', example: faker.internet.email() },
      phoneNumber: { type: 'string', example: faker.phone.number() },
      username: { type: 'string', example: faker.internet.userName() },
      password: {
        type: 'string',
        example: 'Password!1',
      },
    },
  },
  LoginSchema: {
    type: 'object',
    required: ['accountIdentifier', 'password'],
    properties: {
      accountIdentifier: { type: 'string', example: 'username' },
      password: { type: 'string', example: 'Password!1' },
    },
  },
  UserSchema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      firstName: { type: 'string', example: faker.name.firstName() },
      lastName: { type: 'string', example: faker.name.lastName() },
      middleName: { type: 'string', example: faker.name.middleName() },
      email: { type: 'string', example: faker.internet.email() },
      phoneNumber: { type: 'string', example: faker.phone.number() },
      username: { type: 'string', example: faker.internet.userName() },
      profilePic: { type: 'string', example: faker.internet.url() },
    },
  },
};
