import { NotFoundError } from '@prisma/client/runtime';

import prisma from '@/helpers/db/connections'
import InternalServerError from '@/helpers/error/internal_server_error';
import * as wrapper from '@/helpers/wrapper';

import { ActivityCategory, ResponseDataCatActivity, ResponseDataCountCatActivity, ResponseDataPageCatActivity } from './activity-category.interface';


export const create = async (payload: ActivityCategory): Promise<ResponseDataCatActivity> => {
  try {
    const result = await prisma.category_activity.create({
      data: payload,
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findOneById = async (id: number): Promise<ResponseDataCatActivity> => {
  try {
    const result = await prisma.category_activity.findUnique({
      where: {
        id_category_activity: id,
      }
    })
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
}

export const updateById = async (id: number, doc: ActivityCategory): Promise<ResponseDataCatActivity> => {
  try {
    const result = await prisma.category_activity.update({
      where: {
        id_category_activity: id,
      },
      data: doc,
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const remove = async (id: number): Promise<ResponseDataCatActivity> => {
  try {
    const result = await prisma.category_activity.delete({
      where: {
        id_category_activity: id,
      },
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAll = async (): Promise<ResponseDataPageCatActivity> => {
  try {
    const result = await prisma.category_activity.findMany();
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAllPagination = async (page: number, limit: number,search: string): Promise<ResponseDataPageCatActivity> => {
  try {
    const result = await prisma.category_activity.findMany({
      where: {
        name: {
          contains: search,
        }
      },
      skip: (page - 1) * limit,
      take: limit,
    })
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const countAll = async (search: string): Promise<ResponseDataCountCatActivity> => {
  try {
    const result = await prisma.category_activity.count({
      where: {
        name: {
          contains: search,
        }
      }
    })
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
