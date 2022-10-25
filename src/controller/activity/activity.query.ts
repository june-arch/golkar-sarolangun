import { NotFoundError } from '@prisma/client/runtime';

import prisma from '@/helpers/db/connections'
import InternalServerError from '@/helpers/error/internal_server_error';
import * as wrapper from '@/helpers/wrapper';

import { Activity, ResponseDataActivity, ResponseDataCountActivity, ResponseDataPageActivity } from './activity.interface';

export const create = async (payload: Activity): Promise<ResponseDataActivity> => {
  try {
    const result = await prisma.activity.create({
      data: payload,
    });
    return wrapper.data(result);
  } catch (error) {
    console.log(error);
    return wrapper.error(new InternalServerError());
  }
};

export const findOneById = async (id: number): Promise<ResponseDataActivity> => {
  try {
    const result = await prisma.activity.findUnique({
      where: {
        id_activity: id,        
      }
    })
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const updateById = async (id: number, doc: Activity): Promise<ResponseDataActivity> => {
  try {
    const result = await prisma.activity.update({
      where: {
        id_activity: id,
      },
      data: doc,
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const remove = async (id: number): Promise<ResponseDataActivity> => {
  try {
    const result = await prisma.activity.delete({
      where: {
        id_activity: id,
      },
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAllPagination = async (
  page: number,
  limit: number,
  search?: string,
  category?: string
): Promise<ResponseDataPageActivity> => {
  try {
    const result = await prisma.activity.findMany({
      where: {
        title: {
          contains: search,
        },
      },
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

export const findAllPaginationHome = async (
  page: number,
  limit: number,
  search?: string,
  category?: string,
): Promise<{err:any, data: any}> => {
  try {
    let params = {}
    if(search && category){
      params['AND'] = {
        title: {
          contains: search,
        },
        category_news_id: {
          equals: Number(category),
        }
      };
    }
    if(!params['AND']){
      if (search) params['title'] = {contains: search};
      if (category) params['category_news_id'] = {equals: Number(category)};
    }
    const result = await prisma.activity.findMany({
      where: params,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [
        {
          created_date: 'desc',
        },
      ]
    });  
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const countAll = async (search?: string, category?: string): Promise<ResponseDataCountActivity> => {
  try {
    let params = {}
    if(search && category){
      params['AND'] = {
        title: {
          contains: search,
        },
        category_news_id: {
          equals: Number(category),
        }
      };
    }
    if(!params['AND']){
      if (search) params['title'] = {contains: search};
      if (category) params['category_news_id'] = {equals: Number(category)};
    }
    const result = await prisma.activity.count({where: params})
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
