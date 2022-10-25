
import { member } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';

import prisma from '@/helpers/db/connections';
import InternalServerError from '@/helpers/error/internal_server_error';
import * as wrapper from '@/helpers/wrapper';

import { ResponseDataCountMember, ResponseDataMember, ResponseDataPageMember } from './member.interface';

export const create = async (payload: member): Promise<ResponseDataMember> => {
  try {
    const result = await prisma.member.create({data: payload});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findOneById = async (id: number): Promise<ResponseDataMember> => {
  try {
    const result = await prisma.member.findFirst({where: {id_member: id, is_deleted: 0}});
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
   return wrapper.error(new InternalServerError());
  }
};

export const findOneByKTP = async (nik: string): Promise<ResponseDataMember> => {
  try {
    const result = await prisma.member.findFirst({where: {nik, is_deleted: 0}});
    if(!result){
      return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result);
  } catch (error) {
   return wrapper.error(new InternalServerError());
  }
};

export const updateById = async (id: number, doc: any): Promise<ResponseDataMember> => {
  try {
    const result = await prisma.member.update({where: {id_member: id}, data: doc});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
export const updateStatusById = async (id: number, status: number): Promise<ResponseDataMember> => {
  try {
    const result = await prisma.member.update({where: {id_member: id}, data: {status}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const remove = async (id: number): Promise<ResponseDataMember> => {
  try {
    const result = await prisma.member.delete({where: {id_member: id}});
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};

export const findAllPagination = async (
  page: number,
  limit: number,
  search: string
): Promise<ResponseDataPageMember> => {
  try {
    const result = await prisma.member.findMany({
      where: {
        fullname: {
          contains: search,
        },
        is_deleted: 0,
      },
      include:{
        region: true,
        admin: true,
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

export const countAll = async (search): Promise<ResponseDataCountMember> => {
  try {
    const result = await prisma.member.count({
      where: {
        fullname: {
          contains: search,
        },
        is_deleted: 0,
      }
    })
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(new InternalServerError());
  }
};
