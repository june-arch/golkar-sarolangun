import nextConnect from 'next-connect'
import jwt from '@/middleware/jwt'
import { createAdmin, deleteAdmin, updateAdminById, findOneAdminByUserame } from '@/lib/db/query'
import { NextApiResponse } from 'next'
import { Admin, NextApiRequestModify } from '@/interface/admin'
import { response } from '@/lib/wrapper'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { username } = req.query;
    const valueUsername = Array.isArray(username) ? username[0] : username;
    const result = await findOneAdminByUserame(valueUsername);
    response(res, 'success', {data: result}, 'get admin', 200);
  })
  .post( async (req, res) => {
    const { fullname, username, password, photo, address, phone_number } = req.body;
    const admin: Admin = {
        fullname,
        username,
        password,
        photo,
        address,
        phone_number,
        created_date: new Date(),
    };
    const result = await createAdmin(admin)
    response(res, 'success', {data: result}, 'created new admin', 201);
  })

export default handler