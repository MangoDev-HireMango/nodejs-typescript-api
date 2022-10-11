import '@dbConfig/plugins';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import helmet from 'helmet';
import compression from 'compression';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@swaggerDocs';
import statusCodes from '@constants/statusCodes';
import router from './api';

const app = express();

app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errors());

// catch 404 and forward to error handler
app.use((_: Request, __: Response, next) => {
  next(createError(statusCodes.HTTP_NOT_FOUND));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || statusCodes.HTTP_SERVER_ERROR);
  const response = { message: err.message, error: err.status };
  res.send(response);
  next();
});

export default app;
