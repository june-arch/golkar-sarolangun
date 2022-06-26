import { CategoryNews } from "@/interface/category-news";
import { Prisma } from "@prisma/client";
import prisma from "../lib/db/connection";

export const create = async (payload: CategoryNews) => {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    // const salt = crypto.randomBytes(16).toString('hex')
    // Here you should insert the user into the database
    return await prisma.category_news.create({
        data: payload
    });
}

export const findOneById = async (id: number): Promise<CategoryNews> => {
    const result = await prisma.category_news.findUnique({
        where:{
            id_category_news:id,
        }
    })
    return result; 
}

export const updateById = async (id: number, doc: CategoryNews) => {
    // Here you update the user based on id/username in the database
    return await prisma.category_news.update({
        where: { 
            id_category_news: id,
        },
        data: doc
    });
}

export const deleteCategoryNews = async (id: number) => {
    // Here you should delete the user in the database
    return await prisma.category_news.delete({
        where: {
            id_category_news: id,
        }
    });
}

export const findAll = async () => {
    const result = await prisma.category_news.findMany({
        select:{
            name:true,
            id_category_news: true,
        }
    });
    return result;
}

export const findAllPagination = async (page: number, limit: number) => {
    const result = await prisma.category_news.findMany({
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAll = async () => {
    const result = await prisma.category_news.count();
    return result;
}

