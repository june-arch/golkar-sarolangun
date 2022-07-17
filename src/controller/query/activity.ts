import { Activity } from '@/controller/interface/activity'
import { Prisma } from '@prisma/client'
import prisma from '../../lib/db/connection'

export const create = async (payload: Activity) => {
  const activity: Activity = {
    ...payload,
  }
  // await prisma.$queryRaw`SELECT * FROM activity`;
  return await prisma.activity.create({
    data: {
      ...activity,
    },
  })
}

export const findOneById = async (id: number) => {
  const result = await prisma.activity.findUnique({
    where: {
      id_activity: id,
    },
  })
  return result
}

export const updateById = async (id: number, doc: Activity) => {
  // Here you update the user based on id/username in the database
  return await prisma.activity.update({
    where: {
      id_activity: id,
    },
    data: doc,
  })
}

export const deleteActivity = async (id: number) => {
  // Here you should delete the user in the database
  return await prisma.activity.delete({
    where: {
      id_activity: id,
    },
  })
}

export const findAllPagination = async (page: number, limit: number) => {
  const result = await prisma.activity.findMany({
    skip: (page - 1) * limit,
    take: limit,
  })
  return result
}

export const countAll = async () => {
  const result = await prisma.activity.count()
  return result
}
