import { admin } from '@prisma/client';
import { NextApiRequest } from 'next';

export type Admin = {
  id_admin?: number;
  fullname: string;
  username: string;
  password: string;
  created_date: Date;
  photo: string;
  address: string;
  phone_number: string;
};

export interface NextApiRequestModify extends NextApiRequest {
  user: Admin;
  files: Express.Multer.File[];
  file: Express.Multer.File;
}

export interface ResponseDataAdmin {
  err: any;
  data: admin;
}

export interface ResponseDataPageAdmin {
  err: any;
  data: admin[];
}

export interface ResponseDataCountAdmin {
  err: any;
  data: number;
}
