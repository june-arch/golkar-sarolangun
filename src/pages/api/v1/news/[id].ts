import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import { deleteNews, findOneById, updateById } from '@/controller/query/news'
import { configNext } from '@/controller/middleware/configNext'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
      return response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
    const result = await findOneById(valueId);
    if(!result){
      return response(res, 'failed', {data: null}, 'data not found', 404);
    }
    return response(res, 'success', {data: result}, 'get news', 200);
  })

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};