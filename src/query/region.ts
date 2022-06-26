import { Region } from "@/interface/region";
import { Prisma } from "@prisma/client";
import prisma from "../lib/db/connection";

export const create = async (payload: Region) => {
    return await prisma.region.create({
        data: payload
    });
}

export const findOneById = async (id: number): Promise<Region> => {
    const result = await prisma.region.findUnique({
        where:{
            id_regional:id,
        }
    })
    return result; 
}

export const updateById = async (id: number, doc: Region) => {
    // Here you update the user based on id/username in the database
    return await prisma.region.update({
        where: { 
            id_regional: id,
        },
        data: doc
    });
}

export const deleteCategoryNews = async (id: number) => {
    // Here you should delete the user in the database
    return await prisma.region.delete({
        where: {
            id_regional: id,
        }
    });
}

export const findAll = async () => {
    const result = await prisma.region.findMany({
        select:{
            name:true,
            id_regional: true,
        }
    });
    return result;
}

export const findAllPagination = async (page: number, limit: number) => {
    const result = await prisma.region.findMany({
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAll = async () => {
    const result = await prisma.region.count();
    return result;
}

