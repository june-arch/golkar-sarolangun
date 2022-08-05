import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { uploadMiddleware } from '@/helpers/middleware/uploads'

import validate from '@/helpers/middleware/validation'
import { configNext } from '@/helpers/middleware/configNext'
import { news } from '@/controller/news/dto'
import { createNews, getAllPagination } from '@/controller/news/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    const { page: p, limit: l, search: s } = req.query
    const dataPage = Array.isArray(p) ? p[0] : p
    const dataLimit = Array.isArray(l) ? l[0] : l
    const dataSearch = Array.isArray(s) ? s[0] : s
    const page = Number(dataPage) || 1
    const limit = Number(dataLimit) || 10
    const search = dataSearch || ''
    const domain = async (page, limit, search) => {
      return getAllPagination(page, limit, search);
    };

    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'get all news')
        : wrapper.responsePage(res, 'success', result, 'get all news', 200);
    };
    return sendResponse(await domain(page, limit, search));
  })
  .use(uploadMiddleware('images/news'))
  .post(
    validate({ body: news }),
    async (req: NextApiRequestModify, res: NextApiResponse) => {
      const payload = req.body;
      const { file, user } = req;
      const domain = async (payload, file, user) => {
        return createNews(payload, file, user);
      };
    
      const sendResponse = async (result) => {
        return (result.err) ? wrapper.response(res, 'failed', result, 'create news')
          : wrapper.response(res, 'success', result, 'create news', 201);
      };
      return sendResponse(await domain(payload, file, user));
    }
  )

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
