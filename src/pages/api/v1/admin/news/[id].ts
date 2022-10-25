import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { editNews, getById, removeNews } from '@/controller/news/news.domain';
import { newsOptional } from '@/controller/news/news.dto';
import { configNext } from '@/helpers/middleware/configNext';
import jwt from '@/helpers/middleware/jwt';
import { uploadMiddleware } from '@/helpers/middleware/uploads';
import validate from '@/helpers/middleware/validation';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler
  .use(jwt)
  .get(async (req, res) => {
    const { id: i } = req.query;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null;
    const domain = async (id: number) => {
      return getById(id);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get one news')
        : wrapper.response(res, 'success', result, 'get one news', 200);
    };
    return sendResponse(await domain(id));
  })
  .delete(async (req, res) => {
    const { id: i } = req.query;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null;
    const domain = async (id: number) => {
      return removeNews(id);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'remove activity')
        : wrapper.response(res, 'success', result, 'remove activity', 200);
    };
    return sendResponse(await domain(id));
  })
  .use(uploadMiddleware('images/news'))
  .patch(
    validate({ body: newsOptional }),
    async (req: NextApiRequestModify, res) => {
      const payload = req.body;
      const { file, user } = req;
      const { id: i } = req.query;
      const value = Array.isArray(i) ? i[0] : i;
      const id = Number(value) || null;
      const domain = async (payload, id, file, user) => {
        return editNews(payload, id, file, user);
      };

      const sendResponse = async (result) => {
        return result.err
          ? wrapper.response(res, 'failed', result, 'edit news')
          : wrapper.response(res, 'success', result, 'edit news', 200);
      };
      return sendResponse(await domain(payload, id, file, user));
    }
  );

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
