import 'dotenv/config';
import definitions from './definitions';
import paths from './paths';

const { DEV_ADMIN_EMAIL = 'info@ulli.com' } = process.env;

export default {
  swagger: '2.0',
  info: {
    description: 'Ulli',
    version: '1.0.0',
    title: 'Ulli',
    termsOfService: '',
    contact: {
      name: 'Admin',
      email: DEV_ADMIN_EMAIL,
    },
    license: {},
  },
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  paths,
  definitions,
};
