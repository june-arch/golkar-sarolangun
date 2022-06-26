import { CategoryActivity } from "@/interface/category-activity";
import { Prisma } from "@prisma/client";
import prisma from "../lib/db/connection";

export const create = async (payload: CategoryActivity) => {
    return await prisma.category_activity.create({
        data: payload
    });
}

export const findOneById = async (id: number): Promise<CategoryActivity> => {
    const result = await prisma.category_activity.findUnique({
        where:{
            id_category_activity:id,
        }
    })
    return result; 
}

export const updateById = async (id: number, doc: CategoryActivity) => {
    // Here you update the user based on id/username in the database
    return await prisma.category_activity.update({
        where: { 
            id_category_activity: id,
        },
        data: doc
    });
}

export const deleteCategoryActivity = async (id: number) => {
    // Here you should delete the user in the database
    return await prisma.category_activity.delete({
        where: {
            id_category_activity: id,
        }
    });
}

export const findAll = async () => {
    const result = await prisma.category_activity.findMany({
        select:{
            name:true,
            id_category_activity: true,
        }
    });
    return result;
}

export const findAllPagination = async (page: number, limit: number) => {
    const result = await prisma.category_activity.findMany({
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAll = async () => {
    const result = await prisma.category_activity.count();
    return result;
}

