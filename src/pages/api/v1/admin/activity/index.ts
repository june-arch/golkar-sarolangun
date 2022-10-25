import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { createActivity, getAllPagination } from '@/controller/activity/activity.domain';
import { activity } from '@/controller/activity/activity.dto';
import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { configNext } from '@/helpers/middleware/configNext';
import jwt from '@/helpers/middleware/jwt';
import { uploadMultipleMiddleware } from '@/helpers/middleware/uploads';
import validate from '@/helpers/middleware/validation';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler
  .use(jwt)
  .get(async (req, res) => {
    const { page: p, limit: l, search: s, category: c } = req.query;
    const dataPage = Array.isArray(p) ? p[0] : p;
    const dataLimit = Array.isArray(l) ? l[0] : l;
    const dataSearch = Array.isArray(s) ? s[0] : s;
    const dataCategory = Array.isArray(c) ? c[0] : c;
    const page = Number(dataPage) || 1;
    const limit = Number(dataLimit) || 10;
    const search = dataSearch || '';
    const category = dataCategory || '';
    const domain = async (page, limit, search, category) => {
      return getAllPagination(page, limit, search, category);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get all activity')
        : wrapper.responsePage(res, 'success', result, 'get all activity', 200);
    };
    return sendResponse(await domain(page, limit, search, category));
  })
  .use(uploadMultipleMiddleware('images/activity'))
  .post(
    validate({ body: activity }),
    async (req: NextApiRequestModify, res: NextApiResponse) => {
      const payload = req.body;
      const { files, user } = req;
      const domain = async (payload, files, user) => {
        return createActivity(payload, files, user);
      };

      const sendResponse = async (result) => {
        return result.err
          ? wrapper.response(res, 'failed', result, 'create activity')
          : wrapper.response(res, 'success', result, 'create activity', 201);
      };
      return sendResponse(await domain(payload, files, user));
    }
  );

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
