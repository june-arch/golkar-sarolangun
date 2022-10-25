import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { getAllPagination, registerAdmin } from '@/controller/admin/admin.domain';
import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import jwt from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler
  .use(jwt)
  .get(async (req, res) => {
    const { page: p, limit: l } = req.query;
    const dataPage = Array.isArray(p) ? p[0] : p;
    const dataLimit = Array.isArray(l) ? l[0] : l;
    const page = Number(dataPage) || 1;
    const limit = Number(dataLimit) || 10;
    const domain = async (page, limit) => {
      return getAllPagination(page, limit);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get all admin')
        : wrapper.responsePage(res, 'success', result, 'get all admin', 200);
    };
    return sendResponse(await domain(page, limit));
  })
  .post(async (req, res) => {
    const payload = req.body;
    const domain = async (payload) => {
      return registerAdmin(payload);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'create admin')
        : wrapper.response(res, 'success', result, 'create admin', 201);
    };
    return sendResponse(await domain(payload));
  });

export default handler;
