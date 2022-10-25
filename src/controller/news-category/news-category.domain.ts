import BadRequestError from '@/helpers/error/bad_request_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import * as wrapper from '@/helpers/wrapper';

import {
  countAll,
  create,
  findAll,
  findAllPagination,
  findOneById,
  remove,
  updateById,
} from './news-category.query';

export const getAllPagination = async (page, limit, search) => {
  const result = await findAllPagination(page, limit, search);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const count = await countAll(search);
  
  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: result.data.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(result.data, meta);
};

export const getAll = async () => {
  const result = await findAll();
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  return wrapper.data(result.data);
};

export const createCategory = async (payload) => {
  const result = await create(payload);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};

export const editCategory = async (id, payload) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await updateById(id, payload);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
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
export const deleteCategory = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const result = await remove(id);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};
