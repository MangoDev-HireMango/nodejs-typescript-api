import createError, { UnknownError } from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import statusCodes from '@constants/statusCodes';

const requestWrapper = (callbackFunc: (req: Request, res: Response, next?: NextFunction) => Promise<Response>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      await callbackFunc(req, res, next);
    } catch (error) {
      if (createError.isHttpError(error)) {
        return next(error);
      }

      return next(createError(statusCodes.HTTP_SERVER_ERROR, error as UnknownError));
    }
  };
};

export default requestWrapper;
