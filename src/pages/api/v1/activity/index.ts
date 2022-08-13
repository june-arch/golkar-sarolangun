import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { getAllPaginationHome } from '@/controller/activity/domain';
import { NextApiRequestModify } from '@/controller/admin/interface';
import { configNext } from '@/helpers/middleware/configNext';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler.get(async (req, res) => {
  const { page: p, limit: l, search: s } = req.query;
  const dataPage = Array.isArray(p) ? p[0] : p;
  const dataLimit = Array.isArray(l) ? l[0] : l;
  const dataSearch = Array.isArray(s) ? s[0] : s;
  const page = Number(dataPage) || 1;
  const limit = Number(dataLimit) || 10;
  const search = dataSearch || '';
  const domain = async (page, limit, search) => {
    return getAllPaginationHome(page, limit, search);
  };

  const sendResponse = async (result) => {
    return result.err
      ? wrapper.response(res, 'failed', result, 'get all activity')
      : wrapper.responsePage(res, 'success', result, 'get all activity', 200);
  };
  return sendResponse(await domain(page, limit, search));
});

export default handler;
//consume req as stream if commented as raw json
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// }
