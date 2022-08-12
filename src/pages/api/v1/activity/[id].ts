import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { getById } from '@/controller/activity/domain';
import { NextApiRequestModify } from '@/controller/admin/interface';
import { configNext } from '@/helpers/middleware/configNext';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler.get(async (req, res) => {
  const { id: i } = req.query;
  const value = Array.isArray(i) ? i[0] : i;
  const id = Number(value) || null;

  const domain = async (id: number) => {
    return getById(id);
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get activity')
      : wrapper.response(res, 'success', result, 'get activity', 200);
  };
  return sendResponse(await domain(id));
});
export default handler;
//consume req as stream if commented as raw json
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// }
