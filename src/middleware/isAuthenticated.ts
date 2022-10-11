import { Request, Response, NextFunction } from 'express';
import jsonResponse from '@utils/jsonResponse';
import { verifyToken } from '@utils/jwt';
import statusCodes from '@constants/statusCodes';

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void} -
 */
const isAuthenticated = (req: Request, res: Response, next: NextFunction): void | Response => {
  let token = req.headers['x-auth-token'];

  if (token) {
    token = String(token).replace('Bearer ', '');
    const decodedToken = verifyToken(token);
    if (decodedToken.id) {
      req.currentUserId = decodedToken.id;
      return next();
    }
  }

  return jsonResponse({ status: statusCodes.HTTP_UNAUTHORIZED, message: 'Please login first', res });
};

export default isAuthenticated;
