import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { createAdmin, deleteAdmin, updateAdminById, findOneAdminByUserame, findOneAdminById } from '@/controller/query/admin'
import { NextApiResponse } from 'next'
import { Admin, NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
        response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
    const result = await findOneAdminById(Number(valueId));
    if(!result){
        logger.error('data not found', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    response(res, 'success', {data: result}, 'get admin', 200);
  })
  .put( async (req, res) => {
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
        response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
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
    const result = await updateAdminById(valueId, admin);
    if(!result){
        logger.error('failed to update', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    response(res, 'success', {data: result}, 'get admin', 200);
  })
//   .delete( async (req, res) => {
//     await deleteAdmin(req.user.id_admin)
//     res.status(204).end()
//   })

export default handler