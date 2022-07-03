import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'
import { countAll, create, findAllPagination } from '@/controller/query/news'
import { News } from '@/controller/interface/news'
import { uploadMiddleware } from '@/controller/middleware/uploads'

import validate from "@/controller/middleware/validation";
import { configNext } from '@/controller/middleware/configNext'
import { news } from '@/controller/dto/news.dto'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { page, limit } = req.query;
    const dataPage = Array.isArray(page) ? page[0] : page;
    const dataLimit = Array.isArray(limit) ? limit[0] : limit;
    const valuePage = Number(dataPage) || 1;
    const valueLimit = Number(dataLimit) || 10;
    const result = await findAllPagination(valuePage, valueLimit);
    const count = await countAll();
    if (!result) {
      logger.error('failed to find data', result);
      response(res, 'failed', { data: null }, 'data not found', 404);
    }
    const meta = {
      page: valuePage,
      totalData: count,
      totalDataOnPage: result.length,
    }

    responsePage(res, 'success', { data: result, meta }, 'get all news', 200);
  })
  .use(uploadMiddleware('images/news'))
  .post(validate({ body: news }), async (req: NextApiRequestModify, res: NextApiResponse) => {
    const { title, content, category_news_id, publisher } = req.body;
    const { file, user } = req;
    const doc: News = {
      title,
      category_news_id: Number(category_news_id),
      admin_id: user.id_admin,
      image: file ? file.filename : '',
      content,
      publisher,
      created_date: new Date()
    };
    const result = await create(doc)
    response(res, 'success', {data: result}, 'success create news', 201);
  })

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};