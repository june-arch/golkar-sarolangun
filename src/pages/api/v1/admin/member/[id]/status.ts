import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import { findOneById, updateStatusById } from '@/controller/query/member'
import validate from "@/controller/middleware/validation";
import { updateStatusMember } from '@/controller/dto/member.dto'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .put(validate({ body: updateStatusMember }), async (req: NextApiRequestModify, res) => {
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
      return response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
    const find = await findOneById(valueId);
    if(!find){
        return response(res, 'failed', {data: null}, 'id not found', 404);
    }
    const { status } = req.body;
    if(find.status == status) {
        return response(res, 'failed', {data: null}, `status already ${status}`, 400);
    }
    
    const result = await updateStatusById(valueId, Number(status));
    return response(res, 'success', {data: result}, 'update news', 200);
  })

export default handler