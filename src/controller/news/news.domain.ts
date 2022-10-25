import BadRequestError from '@/helpers/error/bad_request_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { unlinkByFileName } from '@/helpers/filter-uploads';
import { deleteFile, uploadFile } from '@/helpers/gcp-bucket/connections';
import { computeImage, computeOneImage } from '@/helpers/utils/compute-image';
import * as wrapper from '@/helpers/wrapper';

import {
  countAll,
  create,
  findAllPagination,
  findAllPaginationHome,
  findOneById,
  remove,
  updateById,
} from './news.query';

export const getAllPagination = async (
  page: number,
  limit: number,
  search: string
) => {
  const result = await findAllPagination(page, limit, search);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const count = await countAll(search, '');
  const computeNewsImage = computeImage(result.data, 'news');
  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: computeNewsImage.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(computeNewsImage, meta);
};

export const getAllPaginationHome = async (
  page: number,
  limit: number,
  search: string,
  category?: string
) => {
  const result = await findAllPaginationHome(page, limit, search, category);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const count = await countAll(search, category);
  const computeNewsImage = computeImage(result.data, 'news');
  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: computeNewsImage.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(computeNewsImage, meta);
};

export const getById = async (id: number) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const computeNewsData = computeOneImage(result.data, 'news');
  return wrapper.data(result.data);
};

export const createNews = async (payload, file, user) => {
  const { category_news_id, ...dataNews } = payload;
  if (file) {
    await uploadFile('news', file);
    dataNews['image'] = file.filename;
  }
  dataNews['category_news_id'] = Number(category_news_id);
  dataNews['admin_id'] = user.id_admin;
  const result = await create(dataNews);
  if(result.err){
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};

export const removeNews = async (id) => {
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
  await deleteFile('news', find.data.image);
  return wrapper.data(result.data);
};

export const editNews = async (payload, id, file, user) => {
  const { category_news_id, ...dataNews } = payload;
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  delete dataNews['image'];
  if (file) {
    await uploadFile('news', file);
    dataNews['image'] = file.filename;
  }
  if (category_news_id) {
    dataNews['category_news_id'] = Number(category_news_id);
  }
  dataNews['updated_by'] = user.id_admin;
  dataNews['updated_date'] = new Date();
  const result = await updateById(id, dataNews);
  if (result.err) {
    return wrapper.error(result.err);
  }
  if(file){
    await deleteFile('news', find.data.image);
    unlinkByFileName('images/news', find.data.image);
  }
  return wrapper.data(result.data);
};
