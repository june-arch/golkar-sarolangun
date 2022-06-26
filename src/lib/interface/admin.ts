import { NextApiRequest } from "next";

export type Admin = {
    id_admin?: number;
    fullname: string;
    username: string;
    password: string;
    created_date: Date;
    photo: string;
    address: string;
    phone_number: string;
}

export interface NextApiRequestModify extends NextApiRequest {
    user: Admin;
}