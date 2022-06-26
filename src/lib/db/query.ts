import { Prisma } from "@prisma/client";
import { Admin } from "../interface/admin";
import prisma from "./connection";
import crypto from 'crypto'
const salt = '34d1a573380d0508c306439b030c6e8f';

export const validatePassword = (user: Admin, inputPassword: string) => {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 24, 'sha512')
        .toString('hex')
    const passwordsMatch = user.password === inputHash
    return passwordsMatch
}

export const createAdmin = async (admin: Admin) => {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    // const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
        .pbkdf2Sync(admin.password, salt, 1000, 24, 'sha512')
        .toString('hex')
    admin.password = hash;
    // Here you should insert the user into the database
    return await prisma.admin.create({
        data: admin
    });
}

export const findOneAdminByUserame = async (username: string): Promise<Admin> => {
    // try {
    //     const result: Array<Admin> = await prisma.$queryRaw(Prisma.sql`SELECT * FROM admin WHERE username = ${username}`);
    //     if (result.length == 0) {
    //         throw new Error('user not found');
    //     }
    //     return Promise.resolve(result[0]);
    // } catch (error) {
    //     return Promise.reject(error);
    // }
    const result = await prisma.admin.findFirst({
        where:{
            username,
        }
    })
    return result; 
}

export const findOneAdminById = async (id: number): Promise<Admin> => {
    // try {
    //     const result: Array<Admin> = await prisma.$queryRaw(Prisma.sql`SELECT * FROM admin WHERE username = ${username}`);
    //     if (result.length == 0) {
    //         throw new Error('user not found');
    //     }
    //     return Promise.resolve(result[0]);
    // } catch (error) {
    //     return Promise.reject(error);
    // }
    const result = await prisma.admin.findUnique({
        where:{
            id_admin:id,
        }
    })
    return result; 
}

export const updateAdminById = async (id: number, doc: Admin) => {
    // Here you update the user based on id/username in the database
    const hash = crypto
    .pbkdf2Sync(doc.password, salt, 1000, 24, 'sha512')
    .toString('hex')
    doc.password = hash;
    return await prisma.admin.update({
        where: { 
            id_admin: id,
        },
        data: doc
    });
}

export const deleteAdmin = async (id: number) => {
    // Here you should delete the user in the database
    return await prisma.admin.delete({
        where: {
            id_admin: id,
        }
    });
}

export const findAllAdminPagination = async (page: number, limit: number) => {
    const result = await prisma.admin.findMany({
        skip: (page-1)*limit,
        take: limit,
    });
    return result;
}

export const countAllAdmin = async () => {
    const result = await prisma.admin.count();
    return result;
}

