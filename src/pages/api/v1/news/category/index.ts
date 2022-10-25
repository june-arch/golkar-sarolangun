import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { getAll } from '@/controller/news-category/news-category.domain';
import { configNext } from '@/helpers/middleware/configNext';
import cors from '@/helpers/middleware/cors';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler.use(cors).get(async (req, res) => {
  const domain = async () => {
    return getAll();
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get all category news')
      : wrapper.response(res, 'success', result, 'get all category news', 200);
  };
  return sendResponse(await domain());
});

export default handler;
//consume req as stream if commented as raw json
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// }
