import crypto from 'crypto';

import prisma from '@/helpers/db/connections';
import InternalServerError from '@/helpers/error/internal_server_error';
import * as wrapper from '@/helpers/wrapper';

import { Admin, ResponseDataAdmin, ResponseDataCountAdmin, ResponseDataPageAdmin } from './admin.interface';
import NotFoundError from '@/helpers/error/not_found_error';
const salt = '34d1a573380d0508c306439b030c6e8f';
const table = 'admin';

export const validatePassword = (user: Admin, inputPassword: string) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 24, 'sha512')
    .toString('hex');
  const passwordsMatch = user.password === inputHash;
  return passwordsMatch;
};

export const create = async (admin: Admin): Promise<ResponseDataAdmin> => {
  try {
    const hash = crypto
      .pbkdf2Sync(admin.password, salt, 1000, 24, 'sha512')
      .toString('hex');
    admin.password = hash;
    const result = await prisma.admin.create({data: admin});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findOneByUserame = async (username: string): Promise<ResponseDataAdmin> => {
  try {
    const result = await prisma.admin.findFirst({where: {username}});
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findOneById = async (id: number): Promise<ResponseDataAdmin> => {
  try {
    const result = await prisma.admin.findFirst({where: {id_admin: id}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const updateById = async (id: number, doc: Admin): Promise<ResponseDataAdmin> => {
  if (doc.password) {
    const hash = crypto
      .pbkdf2Sync(doc.password, salt, 1000, 24, 'sha512')
      .toString('hex');
    doc.password = hash;
  }
  try {
    const result = await prisma.admin.update({where: {id_admin: id}, data: doc});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const remove = async (id: number): Promise<ResponseDataAdmin> => {
  try {
    const result = await prisma.admin.delete({where: {id_admin: id}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAllPagination = async (page: number, limit: number): Promise<ResponseDataPageAdmin> => {
  try {
    const result = await prisma.admin.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [
        {
          created_date: 'desc',
        },
      ]
    })
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const countAll = async (): Promise<ResponseDataCountAdmin> => {
  try {
    const result = await prisma.admin.count();
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
