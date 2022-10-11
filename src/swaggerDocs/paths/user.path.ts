import { faker } from '@faker-js/faker';
import { customResponse } from '../constants';

export default {
  '/users/sign-up': {
    post: {
      tags: ['User'],
      summary: 'Create user account',
      parameters: [
        { in: 'formData', type: 'string', name: 'firstName', required: true, default: faker.name.firstName() },
        { in: 'formData', type: 'string', name: 'lastName', required: true, default: faker.name.lastName() },
        { in: 'formData', type: 'string', name: 'email', required: true, default: faker.internet.email() },
        { in: 'formData', type: 'string', name: 'username', default: 'username' },
        { in: 'formData', type: 'string', name: 'phoneNumber', default: faker.phone.number() },
        { in: 'formData', type: 'string', name: 'password', required: true, default: 'Password!1' },
        { in: 'formData', type: 'file', name: 'profilePic' },
      ],
      responses: customResponse({
        201: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 201,
              },
              data: {
                $ref: '#/definitions/UserSchema',
              },
              token: {
                type: 'string',
              },
            },
          },
        },
      }),
    },
  },
  '/users/login': {
    post: {
      tags: ['User'],
      summary: 'User login',
      parameters: [
        {
          in: 'body',
          name: 'body',
          schema: {
            $ref: '#/definitions/LoginSchema',
          },
        },
      ],
      responses: customResponse({
        200: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 200,
              },
              data: {
                $ref: '#/definitions/UserSchema',
              },
              token: {
                type: 'string',
              },
            },
          },
        },
      }),
    },
  },
};
