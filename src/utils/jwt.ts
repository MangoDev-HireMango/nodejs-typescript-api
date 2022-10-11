import 'dotenv/config';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export const generateToken = (payload: JwtPayload, options: SignOptions = { expiresIn: '30d' }): string => {
  return jwt.sign(payload, String(JWT_SECRET_KEY), options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, String(JWT_SECRET_KEY)) as JwtPayload;
};
