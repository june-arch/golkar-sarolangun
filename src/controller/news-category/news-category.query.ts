import prisma from '@/helpers/db/connections';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import * as wrapper from '@/helpers/wrapper';

import { NewsCategory, ResponseDataCatNews, ResponseDataCountCatNews, ResponseDataPageCatNews } from './news-category.interface';
export const create = async (payload: NewsCategory): Promise<ResponseDataCatNews> => {
  try {
    const result = await prisma.category_news.create({data: payload});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findOneById = async (id: number): Promise<ResponseDataCatNews> => {
  try {
    const result = await prisma.category_news.findFirst({where: {id_category_news: id}});
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const updateById = async (id: number, doc: NewsCategory): Promise<ResponseDataCatNews> => {
  try {
    const result = await prisma.category_news.update({where:{id_category_news: id}, data: doc});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const remove = async (id: number): Promise<ResponseDataCatNews> => {
  try {
    const result = await prisma.category_news.delete({where: {id_category_news: id}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAll = async (): Promise<ResponseDataPageCatNews> => {
  try {
    const result = await prisma.category_news.findMany();
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAllPagination = async (page: number, limit: number, search: string): Promise<ResponseDataPageCatNews> => {
  try {
    const result = await prisma.category_news.findMany({
      where:{
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

export const countAll = async (search: string): Promise<ResponseDataCountCatNews> => {
  try {
    const params = {
      where: {
        name: {
          contains: search,
        },
      }
    }
    const result = await prisma.category_news.count(params);
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
