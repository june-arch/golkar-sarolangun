import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { findOneById, updateStatusById } from '@/controller/member/query'
import validate from '@/helpers/middleware/validation'
import { updateStatusMember } from '@/controller/member/dto'
import { editMemberStatus } from '@/controller/member/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .put(
    validate({ body: updateStatusMember }),
    async (req: NextApiRequestModify, res) => {
      const { status } = req.body
      const { id: i } = req.query;
      const value = Array.isArray(i) ? i[0] : i;
      const id = Number(value) || null
      
      const domain = async (status, id) => {
        return editMemberStatus(status, id);
      };
    
      const sendResponse = async (result) => {
        return (result.err) ? wrapper.response(res, 'failed', result, 'edit status member')
          : wrapper.response(res, 'success', result, 'edit edit status member', 200);
      };
      return sendResponse(await domain(status, id));
    }
  )

export default handler
