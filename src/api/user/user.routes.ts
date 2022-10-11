import { Router } from 'express';
import requestWrapper from '@middleware/requestWrapper';
import UserController from './user.controller';
import * as validations from './user.validations';

const userRouter = Router();

userRouter.post('/sign-up', validations.validateSignUp, requestWrapper(UserController.createAccount));
userRouter.post('/login', validations.validateLogin, requestWrapper(UserController.userLogin));

export default userRouter;
