import { createPool, Pool } from 'mysql2';

const connectionPool = [];

export const createConnectionPool = async (config) => {
  const currConnection = connectionPool.findIndex(
    (conf) => conf.config.toString() === config.toString()
  );
  let db: Pool;
  if (currConnection === -1) {
    db = createPool(config);
    connectionPool.push({
      config,
      connection: db,
    });
  }
  return db;
};

export const getConnection = async (config) => {
  const currConnection = connectionPool.filter(
    (conf) => conf.config.toString() === config.toString()
  );
  let conn: Pool;
  currConnection.forEach((obj, i) => {
    if (i === 0) {
      const { connection } = obj;
      conn = connection;
    }
  });
  return conn;
};
