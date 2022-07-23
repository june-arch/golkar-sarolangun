import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { uploadDiffMiddleware } from '@/helpers/middleware/uploads'
import validate from '@/helpers/middleware/validation'
import { configNext } from '@/helpers/middleware/configNext'
import { updateMember } from '@/controller/member/dto'
import { editMember, getOne, removeMember } from '@/controller/member/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    const { id: i } = req.query;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null
    const domain = async (id) => {
      return getOne(id);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'get one member')
        : wrapper.response(res, 'success', result, 'get one member', 200);
    };
    return sendResponse(await domain(id));
  })
  .delete(async (req, res) => {
    const { id: i } = req.query
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null
    const domain = async (id) => {
      return removeMember(id);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'remove member')
        : wrapper.response(res, 'success', result, 'remove member', 200);
    };
    return sendResponse(await domain(id));
  })
  .use(uploadDiffMiddleware('images/users'))
  .patch(
    validate({ body: updateMember }),
    async (req: NextApiRequestModify, res) => {
      const payload = req.body
      const { files, user } = req
      const { id: i } = req.query
      const value = Array.isArray(i) ? i[0] : i
      const id = Number(value) || null
      const domain = async (payload, id, files, user) => {
        return editMember(payload, id, files, user);
      };
    
      const sendResponse = async (result) => {
        return (result.err) ? wrapper.response(res, 'failed', result, 'remove member')
          : wrapper.response(res, 'success', result, 'remove member', 200);
      };
      return sendResponse(await domain(payload, id, files, user));
    }
  )

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
