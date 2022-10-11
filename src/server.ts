import http from 'http';
import dotenv from 'dotenv';
import { dbConnect } from '@dbConfig';
import app from './app';

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

Promise.all([dotenv.config(), dbConnect()]).then(() => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port: ${PORT}`);
  });
});
