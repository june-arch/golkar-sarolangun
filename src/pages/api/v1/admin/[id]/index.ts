import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { editAdmin, getOne } from '@/controller/admin/admin.domain';
import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import cors from '@/helpers/middleware/cors';
import jwt from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler
  .use(cors)
  .use(jwt)
  .get(async (req, res) => {
    const { id: i } = req.query;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null;
    const domain = async (id) => {
      return getOne(id);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get one admin')
        : wrapper.response(res, 'success', result, 'get one admin', 200);
    };
    return sendResponse(await domain(id));
  })
  .patch(async (req, res) => {
    const { id: i } = req.query;
    const payload = req.body;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null;

    const domain = async (payload, id) => {
      return editAdmin(payload, id);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'edit admin')
        : wrapper.response(res, 'success', result, 'edit admin', 200);
    };
    return sendResponse(await domain(payload, id));
  });

export default handler;
