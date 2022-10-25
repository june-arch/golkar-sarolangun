import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { getAllPaginationHome } from '@/controller/news/news.domain';
import { configNext } from '@/helpers/middleware/configNext';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler.get(async (req, res) => {
  const { page: p, limit: l, search: s, category: c } = req.query;
  const dataPage = Array.isArray(p) ? p[0] : p;
  const dataLimit = Array.isArray(l) ? l[0] : l;
  const dataSearch = Array.isArray(s) ? s[0] : s;
  const dataCategory = Array.isArray(c) ? c[0] : c;
  const page = Number(dataPage) || 1;
  const limit = Number(dataLimit) || 10;
  const search = dataSearch || '';
  const category = dataCategory || '';
  const domain = async (page, limit, search, category) => {
    return getAllPaginationHome(page, limit, search, category);
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get all news')
      : wrapper.responsePage(res, 'success', result, 'get all news', 200);
  };
  return sendResponse(await domain(page, limit, search, category));
});

export default handler;
//consume req as stream if commented as raw json
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// }
