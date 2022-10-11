import { Joi, celebrate } from 'celebrate';

export const validateSignUp = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().allow(null, ''),
    email: Joi.string().email(),
    username: Joi.string().allow(null, ''),
    phoneNumber: Joi.string().allow(null, ''),
    password: Joi.string().required().min(8),
  }),
});

export const validateLogin = celebrate({
  body: Joi.object().keys({
    accountIdentifier: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
