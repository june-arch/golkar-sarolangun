import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import { countAll, findAllPagination } from '@/controller/query/member'
import { configNext } from '@/controller/middleware/configNext'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    const { page, limit } = req.query;
    const dataPage = Array.isArray(page) ? page[0] : page;
    const dataLimit = Array.isArray(limit) ? limit[0] : limit;
    const valuePage = Number(dataPage) || 1;
    const valueLimit = Number(dataLimit) || 10;
    const result = await findAllPagination(valuePage, valueLimit);
    const count = await countAll();
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404);
    }
    const meta = {
      page: valuePage,
      totalData: count,
      totalDataOnPage: result.length,
    }

    return responsePage(res, 'success', { data: result, meta }, 'get all member', 200);
  })

export default handler