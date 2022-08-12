import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/interface';
import { getAllPaginationHome } from '@/controller/news/domain';
import { configNext } from '@/helpers/middleware/configNext';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler.get(async (req, res) => {
  const { page: p, limit: l } = req.query;
  const dataPage = Array.isArray(p) ? p[0] : p;
  const dataLimit = Array.isArray(l) ? l[0] : l;
  const page = Number(dataPage) || 1;
  const limit = Number(dataLimit) || 10;
  const domain = async (page: number, limit: number) => {
    return getAllPaginationHome(page, limit);
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get all news')
      : wrapper.responsePage(res, 'success', result, 'get all news', 200);
  };
  return sendResponse(await domain(page, limit));
});

export default handler;
//consume req as stream if commented as raw json
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// }
