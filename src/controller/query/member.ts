
import { Prisma } from "@prisma/client";
import prisma from "../../lib/db/connection";
import { Member } from "../interface/member";

export const create = async (payload: Member) => {
    const news: Member = {
        ...payload
    }
    console.log(news)
    return await prisma.member.create({
        data:{
            ...news,
        }
    });
}

export const findOneById = async (id: number) => {
    const result = await prisma.member.findUnique({
        where:{
            id_member:id,
        }
    })
    return result; 
}

export const updateById = async (id: number, doc: Member) => {
    // Here you update the user based on id/username in the database
    return await prisma.member.update({
        where: { 
            id_member: id,
        },
        data: {
            ...doc,
        }
    });
}

export const deleteMember = async (id: number) => {
    // Here you should delete the user in the database
    return await prisma.member.delete({
        where: {
            id_member: id,
        }
    });
}

export const findAllPagination = async (page: number, limit: number) => {
    const result = await prisma.member.findMany({
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAll = async () => {
    const result = await prisma.member.count();
    return result;
}

