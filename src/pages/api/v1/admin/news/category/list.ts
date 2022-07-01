import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'
import { findAll } from '@/controller/query/category-news'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const result = await findAll();
    if (!result) {
      logger.error('failed to find data', result);
      response(res, 'failed', { data: null }, 'data not found', 404);
    }

    responsePage(res, 'success', { data: result }, 'get all category news', 200);
  })

export default handler