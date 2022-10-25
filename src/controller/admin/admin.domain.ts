import BadRequestError from '@/helpers/error/bad_request_error';
import ConflictError from '@/helpers/error/conflict_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { generateToken } from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

import {
  countAll,
  create,
  findAllPagination,
  findOneById,
  findOneByUserame,
  updateById,
  validatePassword,
} from './admin.query';

export const getAllPagination = async (page, limit) => {
  const result = await findAllPagination(page, limit);
  const count = await countAll();

  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: result.data.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(result.data, meta);
};

export const getOne = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  return wrapper.data(result.data);
};

export const authLogin = async (username: string, password: string) => {
  const result = await findOneByUserame(username);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  if (!validatePassword(result.data, password)) {
    return wrapper.error(new ConflictError('wrong password'));
  }
  const {id_admin, username: user_name} = result.data;
  const payload = {
    sub: id_admin,
    username: user_name,
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
  payload['created_date'] = new Date();
  const result = await create(payload);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};

export const editAdmin = async (payload, id) => {
  payload['updated_at'] = new Date();
  if (!id) {
    return wrapper.error(new BadRequestError('id invalid'));
  }
  const result = await updateById(id, payload);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};
