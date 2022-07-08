import { readdir, readFileSync, unlink } from 'fs';
import { extname, join } from 'path';
import { v4 } from 'uuid';

export const imageFileFilter = (
  req,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      {code:'EXTENSION_NOT_SUPPORTED',message:'Only image files jpg|jpeg|png are allowed!'},
      false,
    );
  }
  callback(null, true);
};

export const imageKtpFilter = (
  req,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      {code:'EXTENSION_NOT_SUPPORTED',message:'Only image files jpg|jpeg|png are allowed!'},
      false,
    );
  }
  callback(null, true);
};

export const videoFileFilter = (
  req,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(mp4|ogg)$/)) {
    return callback(
      {code:'EXTENSION_NOT_SUPPORTED',message:'Only video files mp4|ogg are allowed!'},
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
      {code:'EXTENSION_NOT_SUPPORTED',message:'Only document files pdf|word are allowed!'},
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

export const unlinkByFileName = (path: string, fileName: string) => {
  try {
    unlink(`./public/uploads/${path}/${fileName}`, (err) => {
      if (err) throw err;
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const unlinkAllFile = (path: string) => {
  try {
    readdir('./public/uploads/'+path, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        unlink(join('./public/uploads/'+path, file), (err) => {
          if (err) throw err;
        });
      }
    });
    return true;
  } catch (err) {
    return false;
  }
};