import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_DATABASE_TEST,
  PG_USER,
  PG_PASSWORD,
} = process.env;

export default {
  port: PORT,
  host: PG_HOST,
  dbport: PG_PORT,
  database: NODE_ENV === 'dev' ? PG_DATABASE : PG_DATABASE_TEST,
  user: PG_USER,
  password: PG_PASSWORD,
};
