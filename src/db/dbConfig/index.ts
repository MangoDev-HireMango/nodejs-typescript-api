import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = MongoMemoryServer.create();
/**
 * @author Mwibutsa Floribert
 * @returns {Promise} -
 */
export async function dbConnect(): Promise<void> {
  let dbUri = process.env.MONGO_DB_URI || '';

  const mongooseOptions: ConnectOptions = {
    autoIndex: true,
  };

  if (String(process.env.NODE_ENV).toLowerCase() === 'test') {
    dbUri = (await mongoServer).getUri();
  }

  await mongoose.connect(`${dbUri}`, mongooseOptions);
}

/**
 * @author Mwibutsa Floribert
 * @returns {Promise} -
 */
export async function dbDisconnect(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongoServer).stop();
}

/**
 * @author  Mwibutsa Floribert
 * @returns {Promise} --
 */
export async function getDBUri(): Promise<string> {
  let uri = process.env.MONGO_DB_URI;
  if (String(process.env.NODE_ENV).toLowerCase() === 'test') {
    uri = (await mongoServer).getUri();
  }
  return String(uri);
}

export const dbConnection = mongoose.connection;
