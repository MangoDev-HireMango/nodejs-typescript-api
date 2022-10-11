import { Response } from 'express';
import statusCodes from '@constants/statusCodes';

interface IResponse {
  [x: string]: unknown;
  status?: number;
  res: Response;
  data?: unknown;
}
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {Response} Response
 */
const jsonResponse = ({ status = statusCodes.HTTP_OK, res, data, ...rest }: IResponse): Response => {
  return res.status(status).json({
    status,
    data,
    ...rest,
  });
};

export default jsonResponse;
