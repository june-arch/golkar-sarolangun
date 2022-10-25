import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { authLogin } from '@/controller/admin/admin.domain';
import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import cors from '@/helpers/middleware/cors';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler.use(cors).post(async (req, res) => {
  const { username, password } = req.body;
  const domain = async (username: string, password: string) => {
    return authLogin(username, password);
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'login admin')
      : wrapper.responsePage(res, 'success', result, 'login admin', 200);
  };
  return sendResponse(await domain(username, password));
});

export default handler;
