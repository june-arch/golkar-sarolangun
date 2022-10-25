import { region } from '@prisma/client';

import prisma from '@/helpers/db/connections';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import * as wrapper from '@/helpers/wrapper';

import { ResponseDataCountRegion, ResponseDataPageRegion, ResponseDataRegion } from './region.interface';

export const create = async (payload: region): Promise<ResponseDataRegion> => {
  try {
    const result = await prisma.region.create({data: payload});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findOneById = async (id: number): Promise<ResponseDataRegion> => {
  try {
    const result = await prisma.region.findFirst({where: {id_regional: id}});
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const updateById = async (id: number, doc: region): Promise<ResponseDataRegion> => {
  try {
    const result = await prisma.region.update({where: {id_regional: id}, data: {...doc}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const remove = async (id: number): Promise<ResponseDataRegion> => {
  try {
    const result = await prisma.region.delete({where: {id_regional: id}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAll = async (): Promise<ResponseDataPageRegion> => {
  try {
    const result = await prisma.region.findMany();
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAllPagination = async (
  page: number,
  limit: number,
  search?: string
): Promise<ResponseDataPageRegion> => {
  try {
    const result = await prisma.region.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    })
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const countAll = async (search?: string): Promise<ResponseDataCountRegion> => {
  try {
    const result = await prisma.region.count({
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
