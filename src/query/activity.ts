
import { Activity } from "@/interface/activity";
import { Prisma } from "@prisma/client";
import prisma from "../lib/db/connection";

export const create = async (payload: Activity) => {
    const activity: Activity = {
        ...payload
    }
    return await prisma.news.create({
        data:{
            ...activity,
        }
    });
}

export const findOneById = async (id: number) => {
    const result = await prisma.news.findUnique({
        where:{
            id_news:id,
        }
    })
    return result; 
}

export const updateById = async (id: number, doc: Activity) => {
    // Here you update the user based on id/username in the database
    return await prisma.news.update({
        where: { 
            id_news: id,
        },
        data: doc
    });
}

export const deleteNews = async (id: number) => {
    // Here you should delete the user in the database
    return await prisma.news.delete({
        where: {
            id_news: id,
        }
    });
}

export const findAllPagination = async (page: number, limit: number) => {
    const result = await prisma.news.findMany({
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAll = async () => {
    const result = await prisma.news.count();
    return result;
}

