
import { Prisma } from "@prisma/client";
import prisma from "../../lib/db/connection";
import { Member } from "../interface/member";

export const create = async (payload: Member) => {
    const news: Member = {
        ...payload
    }
    return await prisma.member.create({
        data:{
            ...news,
        }
    });
}

export const findOneById = async (id: number) => {
    const result = await prisma.member.findFirst({
        where:{
            id_member:id,
            is_deleted: 0,
        },
    })
    return result; 
}

export const updateById = async (id: number, doc: any) => {
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
export const updateStatusById = async (id: number, status: number) => {
    // Here you update the user based on id/username in the database
    return await prisma.member.update({
        where: { 
            id_member: id,
        },
        data: {
            status,
        }
    });
}

export const deleteMember = async (id: number) => {
    // middleware to soft delete
    return await prisma.member.delete({
        where: {
            id_member: id,
        }
    });
}

export const findAllPagination = async (page: number, limit: number) => {
    const result = await prisma.member.findMany({
        where:{
            is_deleted: 0,
        },
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAll = async () => {
    const result = await prisma.member.count({
        where: {
            is_deleted: 0,
        }
    });
    return result;
}

