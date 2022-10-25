import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { getAll } from '@/controller/region/region.domain';
import cors from '@/helpers/middleware/cors';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler.use(cors).get(async (req, res) => {
  const domain = async () => {
    return getAll();
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get all region')
      : wrapper.response(res, 'success', result, 'get all region', 200);
  };
  return sendResponse(await domain());
});

export default handler;
