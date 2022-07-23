import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { getAll } from '@/controller/region/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler.use(jwt).get(async (req, res) => {
  const domain = async () => {
    return getAll();
  };

  const sendResponse = async (result) => {
    return (result.err) ? wrapper.response(res, 'failed', result, 'get all region')
      : wrapper.response(res, 'success', result, 'get all region', 200);
  };
  return sendResponse(await domain());
})

export default handler
