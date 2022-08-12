import { createConnection } from 'mysql2/promise';
import 'dotenv';

import InternalServerError from '../error/internal_server_error';
import * as wrapper from '../wrapper';

// export const execute = async (statement: string, params: string[] | object) => {
//     const config = {
//         connectionLimit: 4,
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USERNAME,
//         port: Number(process.env.DATABASE_PORT),
//         password: process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE_NAME,
//     }
//     let db = await getConnection(config);
//     if(isEmpty(db)){
//         db = await createConnectionPool(config);
//     }
//     try {
//         db.getConnection((err, connection) => {
//             if(err)
//               connection.release();
//         })

//         const recordset = () => {
//             return new Promise((resolve, reject) => {
//               db.getConnection((err, connection) => {
//                 if (err) {
//                   let errorMessage;
//                   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//                     errorMessage = 'Database connection was closed.';
//                   }
//                   if (err.code === 'ER_CON_COUNT_ERROR') {
//                     errorMessage = 'Database has too many connections.';
//                   }
//                   if (err.code === 'ECONNREFUSED') {
//                     errorMessage = 'Database connection was refused.';
//                   }
//                   connection.release();
//                   reject(wrapper.error(errorMessage));
//                 }
//                 else {
//                   connection.query(statement, params, (err, result) => {
//                     if (err) {
//                       connection.release();
//                       reject(wrapper.error(err.message));
//                     }
//                     else {
//                       connection.release();
//                       resolve(wrapper.data(result));
//                     }
//                   });
//                 }
//               });
//             });
//           };
//         return await recordset().then(result => result).catch(err => err);
//     } catch (err) {
//         wrapper.error(err);
//     }
// }

export const execute = async (statement: string, params: string[] | object) => {
  const config = {
    connectionLimit: 4,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    port: Number(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };
  let db = await createConnection(config);
  try {
    console.log(statement, params);
    const [data] = await db.execute(statement, params);
    db.end();
    return wrapper.data(data);
  } catch (err) {
    return wrapper.error(new InternalServerError(err));
  }
};
