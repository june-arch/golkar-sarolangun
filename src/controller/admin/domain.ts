import BadRequestError from '@/helpers/error/bad_request_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { generateToken } from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

import { Admin } from './interface';
import {
  countAll,
  create,
  findAllPagination,
  findOneById,
  findOneByUserame,
  updateById,
  validatePassword,
} from './query';

export const getAllPagination = async (page, limit) => {
  const result = await findAllPagination(page, limit);
  const count = await countAll();

  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  const meta = {
    page,
    totalData: count['data'][0].count,
    totalDataOnPage: result['data'].length,
    totalPage: Math.ceil(count['data'][0].count / limit),
  };
  return wrapper.dataPagination(result['data'], meta);
};
export const getOne = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  return wrapper.data(result['data'][0]);
};

export const authLogin = async (username: string, password: string) => {
  const result = await findOneByUserame(username);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  if (!validatePassword(result['data'][0], password)) {
    return wrapper.error(new BadRequestError('wrong password'));
  }
  const payload = {
    sub: result['data'][0].id_admin,
    username: result['data'][0].username,
  };
  const token = await generateToken(payload, '12h');

  // return basic user details and token
  const data = {
    id: payload.sub,
    username: payload.username,
    token,
  };
  return wrapper.data(data);
};

export const registerAdmin = async (payload) => {
  const admin: Admin = {
    ...payload,
    created_date: new Date(),
  };
  const result = await create(admin);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  return wrapper.data(result['data']);
};

export const editAdmin = async (payload, id) => {
  const admin: Admin = {
    ...payload,
    updated_at: new Date(),
  };
  if (!id) {
    return wrapper.error(new BadRequestError('id invalid'));
  }
  const result = await updateById(id, admin);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  return wrapper.data(result['data']);
};
