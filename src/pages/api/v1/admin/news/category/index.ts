import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import {
  createCategory,
  getAllPagination,
} from '@/controller/news-category/news-category.domain';
import cors from '@/helpers/middleware/cors';
import jwt from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

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
        ? wrapper.response(res, 'failed', result, 'get all news category')
        : wrapper.responsePage(
            res,
            'success',
            result,
            'get all news category',
            200
          );
    };
    return sendResponse(await domain(page, limit, search));
  })
  .post(async (req, res) => {
    const payload = req.body;
    const domain = async (payload) => {
      return createCategory(payload);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get news category')
        : wrapper.response(res, 'success', result, 'create news category', 200);
    };
    return sendResponse(await domain(payload));
  });

export default handler;
