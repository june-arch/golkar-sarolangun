import prisma from '@/helpers/db/connections';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import * as wrapper from '@/helpers/wrapper';

import { News, ResponseDataCountNews, ResponseDataNews, ResponseDataPageNews } from './news.interface';

export const create = async (payload: News): Promise<ResponseDataNews> => {
  try {
    const result = await prisma.news.create({data: payload});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError(error));
  }
};

export const findOneById = async (id: number): Promise<ResponseDataNews> => {
  try {
    const result = await prisma.news.findFirst({where: {id_news: id}});
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError(error));
  }
};

export const updateById = async (id: number, doc: News): Promise<ResponseDataNews> => {
  try {
    const result = await prisma.news.update({where: {id_news: id}, data: doc});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError(error));
  }
};

export const remove = async (id: number): Promise<ResponseDataNews> => {
  try {
    const result = await prisma.news.delete({where: {id_news: id}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError(error));
  }
};

export const findAllPagination = async (
  page: number,
  limit: number,
  search: string
): Promise<ResponseDataPageNews> => {
  try {
    const result = await prisma.news.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      include:{
        admin: true,
        category_news: true,
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
  category?: string
): Promise<{err:any, data:any}> => {
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
    const result = await prisma.news.findMany({
      where: params,
      include:{
        admin: true,
        category_news: true,
      },
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
    console.log(error);
    return wrapper.error(new InternalServerError());
  }
};

export const countAll = async (search?: string, category?: string): Promise<ResponseDataCountNews> => {
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
    const result = await prisma.news.count({where: params})
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
