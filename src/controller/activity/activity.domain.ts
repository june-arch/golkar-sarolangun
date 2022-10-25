import BadRequestError from '@/helpers/error/bad_request_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { unlinkAllFile } from '@/helpers/filter-uploads';
import { deleteFile, uploadFile } from '@/helpers/gcp-bucket/connections';
import { computeImages, computeOneImages } from '@/helpers/utils/compute-image';
import * as wrapper from '@/helpers/wrapper';

import {
  countAll,
  create,
  findAllPagination,
  findAllPaginationHome,
  findOneById,
  remove,
  updateById,
} from './activity.query';

export const getAllPagination = async (
  page: number,
  limit: number,
  search: string,
  category: string
) => {
  const result = await findAllPagination(page, limit, search, category);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const count = await countAll(search, category);
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const computeActivityImage = computeImages(result.data, 'activity');
  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: computeActivityImage.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(computeActivityImage, meta);
};

export const getAllPaginationHome = async (
  page: number,
  limit: number,
  search?: string,
  category?: string
) => {
  const result = await findAllPaginationHome(page, limit, search, category);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const count = await countAll(search, category);
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const computeActivityImage = computeImages(result.data, 'activity');
  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: computeActivityImage.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(computeActivityImage, meta);
};

export const getById = async (id: number) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const computeActivityData = computeOneImages(result.data, 'activity');
  return wrapper.data(computeActivityData);
};

export const createActivity = async (payload, files, user) => {
  let { category_activity_id, ...docActivity } = payload;
  let imagesFilename = [];
  if (files && files.length > 0) {
    for (let file of files) {
      try {
        imagesFilename.push(file.filename)
        await uploadFile('activity', file);
      } catch (error) {
        unlinkAllFile('activity');
        return wrapper.error(new InternalServerError('failed upload image'));
      }
    }
    unlinkAllFile('activity');
    docActivity['image'] = imagesFilename.join(',');
    docActivity['category_activity_id'] = Number(category_activity_id);
    docActivity['admin_id'] = user.id_admin;
  }
  const result = await create(docActivity);
  if(result.err){
    return wrapper.error(new InternalServerError())
  }
  return wrapper.data(result.data);
};

export const removeActivity = async (id) => {
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
  for (let item of find.data.image.split(',')) {
    await deleteFile('activity', item);
  }
  return wrapper.data(result.data);
};

export const editActivity = async (payload, id, files, user) => {
  let { category_activity_id, ...docActivity } = payload;
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  let imagesFilename = [];
  if (files && files.length > 0) {
    for (let file of files) {
      try {
        imagesFilename.push(file.filename)
        await uploadFile('activity', file);
      } catch (error) {
        unlinkAllFile('activity');
        return wrapper.error(new InternalServerError('failed upload image'));
      }
    }
    unlinkAllFile('activity');
    docActivity['updated_by'] = user.id_admin;
    docActivity['updated_date'] = new Date();
  }
  if (category_activity_id) {
    docActivity['category_activity_id'] = Number(category_activity_id);
  }
  delete docActivity['image'];
  if (imagesFilename.length > 0) {
    docActivity['image'] = imagesFilename.join(',');
  }
  const result = await updateById(id, docActivity);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  for (let item of find.data.image.split(',')) {
    await deleteFile('activity', item);
  }
  return wrapper.data(result.data);
};
