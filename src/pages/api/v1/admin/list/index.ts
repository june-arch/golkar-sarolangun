import nextConnect from 'next-connect'
import jwt from '@/middleware/jwt'
import { countAllAdmin, findAllAdminPagination } from '@/lib/db/query'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { page, limit } = req.query;
    const dataPage = Array.isArray(page) ? page[0] : page;
    const dataLimit = Array.isArray(limit) ? limit[0] : limit;
    const valuePage = Number(dataPage) || 1;
    const valueLimit = Number(dataLimit) || 10;
    const result = await findAllAdminPagination(valuePage, valueLimit);
    const count = await countAllAdmin();
    if(!result){
        logger.error('failed to update', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    const meta = {
        page: valuePage,
        totalData: count,
        totalDataOnPage: result.length,
    }

    responsePage(res, 'success', {data: result, meta}, 'get all admin', 200);
  })

export default handler