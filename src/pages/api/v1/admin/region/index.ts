import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { createRegion, getAllPagination } from '@/controller/region/region.domain';
import jwt from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler
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
        ? wrapper.response(res, 'failed', result, 'get all region')
        : wrapper.responsePage(res, 'success', result, 'get all region', 200);
    };
    return sendResponse(await domain(page, limit, search));
  })
  .post(async (req, res) => {
    const payload = req.body;
    const domain = async (payload) => {
      return createRegion(payload);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'create region')
        : wrapper.response(res, 'success', result, 'create region', 200);
    };
    return sendResponse(await domain(payload));
  });

export default handler;
