import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { configNext } from '@/helpers/middleware/configNext'
import { getById } from '@/controller/news/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler.get(async (req, res) => {
  const { id: i } = req.query
  const value = Array.isArray(i) ? i[0] : i
  const id = Number(value) || null
  
  const domain = async (id: number) => {
    return getById(id);
  };

  const sendResponse = async (result) => {
    return (result.err) ? wrapper.response(res, 'failed', result, 'get news')
      : wrapper.response(res, 'success', result, 'get news', 200);
  };
  return sendResponse(await domain(id));
})

export default handler
//consume req as stream if commented as raw json
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// }
