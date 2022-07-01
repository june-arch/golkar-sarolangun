import nextConnect from 'next-connect'
import jwt from '@/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'
import { countAll, create, findAllPagination } from '@/query/news'
import { News } from '@/interface/news'
import { uploadMiddleware } from '@/middleware/uploads'
import { ApiResponse } from '@/interface/apiResponse'
import Joi from "joi";

import validate from "@/middleware/validation";

const news = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category_news_id: Joi.string().required(),
  publisher: Joi.string().required(),
});

interface NextConnectApiRequest extends NextApiRequestModify {
  file: Express.Multer.File;
}

type ResponseData = ApiResponse<object, string>;

const handler = nextConnect<NextConnectApiRequest, NextApiResponse>({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    if(error.code == "LIMIT_FILE_SIZE"){
      res.status(400).json({ error: `Sorry something Happened! ${error.message}`, statusCode: 400 });  
    }
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})

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
  .post(validate({ body: news }), async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    const { title, content, category_news_id, publisher } = req.body;
    const { file, user } = req;
    console.log(user)
    const news: News = {
      title,
      category_news_id: Number(category_news_id),
      admin_id: user.id_admin,
      image: file ? file.filename : '',
      content,
      publisher,
      created_date: new Date()
    };
    const result = await create(news)
    res.status(200).json({ data: result });
  })

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};