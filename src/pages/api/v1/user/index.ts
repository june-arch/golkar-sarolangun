import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { uploadDiffMiddleware } from '@/helpers/middleware/uploads'

import validate from '@/helpers/middleware/validation'
import { configNext } from '@/helpers/middleware/configNext'
import { createMember } from '@/controller/member/dto'
import { registerMember } from '@/controller/member/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(uploadDiffMiddleware('images/users'))
  .post(validate({ body: createMember }), async (req: NextApiRequestModify, res: NextApiResponse) => {
      const payload = req.body;
      const { files } = req;
      const domain = async (files, payload) => {
        return registerMember(files, payload);
      };
    
      const sendResponse = async (result) => {
        return (result.err) ? wrapper.response(res, 'failed', result, 'apply kta')
          : wrapper.response(res, 'success', result, 'apply kta', 201);
      };
      return sendResponse(await domain(files, payload));
    }
  )

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
