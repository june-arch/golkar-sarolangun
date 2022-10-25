import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { getAllPagination, registerMember } from '@/controller/member/member.domain';
import { createMember } from '@/controller/member/member.dto';
import { configNext } from '@/helpers/middleware/configNext';
import cors from '@/helpers/middleware/cors';
import jwt from '@/helpers/middleware/jwt';
import { uploadDiffMiddleware } from '@/helpers/middleware/uploads';
import validate from '@/helpers/middleware/validation';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler
  .use(cors)
  .use(jwt)
  .get(async (req, res) => {
    const { page: p, limit: l, search: s } = req.query;
    const dataPage = Array.isArray(p) ? p[0] : p;
    const dataLimit = Array.isArray(l) ? l[0] : l;
    const dataSearch = Array.isArray(s) ? s[0] : s;
    const page = Number(dataPage) || 1;
    const limit = Number(dataLimit) || 10;
    const search = dataSearch || '';
    const domain = async (page, limit, search) => {
      return getAllPagination(page, limit, search);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get all member')
        : wrapper.responsePage(res, 'success', result, 'get all member', 200);
    };
    return sendResponse(await domain(page, limit, search));
  })
  .use(uploadDiffMiddleware('images/users'))
  .post(
    validate({ body: createMember }),
    async (req: NextApiRequestModify, res: NextApiResponse) => {
      const payload = req.body;
      const { files } = req;
      const domain = async (files, payload) => {
        return registerMember(files, payload);
      };

      const sendResponse = async (result) => {
        return result.err
          ? wrapper.response(res, 'failed', result, 'create new member kta')
          : wrapper.response(
              res,
              'success',
              result,
              'create new member kta',
              201
            );
      };
      return sendResponse(await domain(files, payload));
    }
  );

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
