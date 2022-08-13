import BadRequestError from '@/helpers/error/bad_request_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { unlinkByFileName } from '@/helpers/filter-uploads';
import * as wrapper from '@/helpers/wrapper';

import { News } from './interface';
import {
  countAll,
  create,
  findAllPagination,
  findAllPaginationHome,
  findOneById,
  remove,
  updateById,
} from './query';

export const getAllPagination = async (
  page: number,
  limit: number,
  search: string
) => {
  const result = await findAllPagination(page, limit, search);
  const count = await countAll(search, '');
  if (result['err']) {
    return wrapper.error(new NotFoundError(result['err']));
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
export const getAllPaginationHome = async (
  page: number,
  limit: number,
  search: string,
  category?: string
) => {
  const result = await findAllPaginationHome(page, limit, search, category);
  const count = await countAll(search, category);
  if (result['err']) {
    return wrapper.error(new NotFoundError(result['err']));
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

export const getById = async (id: number) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result['err']) {
    return wrapper.error(result['err']);
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  return wrapper.data(result['data'][0]);
};

export const createNews = async (payload, file, user) => {
  const { category_news_id, ...dataNews } = payload;
  if (file) {
    dataNews['image'] = file.filename;
  }
  const doc: News = {
    ...dataNews,
    category_news_id: Number(category_news_id),
    admin_id: user.id_admin,
  };
  const result = await create(doc);
  return wrapper.data(result['data']);
};

export const removeNews = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find['err']) {
    return wrapper.error(find['err']);
  }
  if (find['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const result = await remove(id);
  if (result['err']) {
    return wrapper.error(result['err']);
  }
  unlinkByFileName('images/news', find['data'][0].image);
  return wrapper.data(result['data']);
};

export const editNews = async (payload, id, file, user) => {
  const { category_news_id, ...dataNews } = payload;
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find['err']) {
    return wrapper.error(find['err']);
  }
  if (find['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  if (category_news_id) {
    dataNews['category_news_id'] = Number(category_news_id);
  }
  delete dataNews['image'];
  if (file) {
    dataNews['image'] = file.filename;
    unlinkByFileName('images/news', find['data'][0].image);
  }
  const news: News = {
    ...dataNews,
    updated_by: user.id_admin,
    updated_date: new Date(),
  };
  const result = await updateById(id, news);
  if (result['err']) {
    return wrapper.error(result['err']);
  }
  return wrapper.data(result['data']);
};
