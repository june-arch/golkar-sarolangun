import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { configNext } from '@/helpers/middleware/configNext'
import { getAllPagination } from '@/controller/member/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler.use(jwt).get(async (req, res) => {
  const { page: p, limit: l } = req.query
  const dataPage = Array.isArray(p) ? p[0] : p
  const dataLimit = Array.isArray(l) ? l[0] : l
  const page = Number(dataPage) || 1
  const limit = Number(dataLimit) || 10
  const domain = async (page, limit) => {
    return getAllPagination(page, limit);
  };

  const sendResponse = async (result) => {
    return (result.err) ? wrapper.response(res, 'failed', result, 'get all member')
      : wrapper.responsePage(res, 'success', result, 'get all member', 200);
  };
  return sendResponse(await domain(page, limit));
})

export default handler
