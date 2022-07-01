import { readdir, unlink } from 'fs';
import { extname, join } from 'path';
import { v4 } from 'uuid';
import logger from './logger/pino';

export const imageFileFilter = (
  req,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new Error('Only image files jpg|jpeg|png are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const documentFileFilter = (
  req,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(pdf|word)$/)) {
    return callback(
      new Error('Only document files pdf|word are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (
  req,
  file: Express.Multer.File,
  callback: Function,
) => {
  const uuid = v4();
  const fileExtName = extname(file.originalname);
  callback(null, `${uuid}${fileExtName}`);
};

export const unlinkFile = () => {
  try {
    readdir('files', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        unlink(join('files', file), (err) => {
          if (err) throw err;
        });
      }
    });
    return true;
  } catch (err) {
    logger.error('helper:util:common:unlink', err);
  }
};