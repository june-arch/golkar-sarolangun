import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import { findAll } from '@/controller/query/category-news'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler.use(jwt).get(async (req, res) => {
  // You do not generally want to return the whole user object
  const result = await findAll()
  if (!result) {
    return response(res, 'failed', { data: null }, 'data not found', 404)
  }

  return responsePage(
    res,
    'success',
    { data: result },
    'get all category news',
    200
  )
})

export default handler
