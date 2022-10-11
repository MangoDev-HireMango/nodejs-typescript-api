import 'dotenv/config';
import '@dbConfig/plugins';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import helmet from 'helmet';
import compression from 'compression';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import expressSession, { SessionOptions } from 'express-session';
import connectMongo from 'connect-mongodb-session';
import fileUpload from 'express-fileupload';
import swaggerDocument from '@swaggerDocs';
import statusCodes from '@constants/statusCodes';
import { getDBUri } from '@dbConfig';
import router from './api';

const app = express();

const MongoStore = connectMongo(expressSession);

export const applyMiddleware = async (): Promise<void> => {
  const DB_URI = await getDBUri();
  const sessionOptions: SessionOptions = {
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new MongoStore({
      uri: DB_URI,
      collection: 'sessions',
    }),
  };

  if (app.get('env') === 'produciton') {
    app.set('trust proxy', 1);
    sessionOptions.cookie = { secure: true };
  }
  app.use(expressSession(sessionOptions));
  app.use(
    fileUpload({
      useTempFiles: true,
    }),
  );
  app.use(cors());
  app.use(compression());
  app.use(logger('dev'));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export const applyRoutes = (): void => {
  app.use('/api/v1', router);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export const applyErrorHandlers = (): void => {
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
};

const applyAll = async () => {
  await applyMiddleware();
  applyRoutes();
  applyErrorHandlers();
};

applyAll();

export default app;
