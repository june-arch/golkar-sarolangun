import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { getAll } from '@/controller/activity-category/domain';
import { NextApiRequestModify } from '@/controller/admin/interface';
import jwt from '@/helpers/middleware/jwt';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler.use(jwt).get(async (req, res) => {
  const domain = async () => {
    return getAll();
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get all category activity')
      : wrapper.response(
          res,
          'success',
          result,
          'get all category activity',
          200
        );
  };
  return sendResponse(await domain());
});

export default handler;
