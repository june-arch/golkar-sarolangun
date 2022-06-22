import { createPool } from 'mysql2';

import logger from './logger/pino';

const db = createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

db.getConnection((err) => {
  if (err) {
    logger.info("error connect to db", err);
  }
  logger.info("connected to db");
});

export const exQuery = async (query: string, arraParams: never[]) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, arraParams, (err, data) => {
        if (err) {
          logger.error("err query", err)
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      logger.error("err something when exec query", err)
      reject(err);
    }
  });
};
