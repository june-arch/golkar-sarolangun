import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { uploadMultipleMiddleware } from '@/helpers/middleware/uploads'
import { activity } from '@/controller/activity/dto'
import validate from '@/helpers/middleware/validation'
import { configNext } from '@/helpers/middleware/configNext'
import { editActivity, getById, removeActivity } from '@/controller/activity/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    const { id: i } = req.query
    const value = Array.isArray(i) ? i[0] : i
    const id = Number(value) || null
    
    const domain = async (id: number) => {
      return getById(id);
    };

    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'get activity')
        : wrapper.response(res, 'success', result, 'get activity', 200);
    };
    return sendResponse(await domain(id));
  })
  .delete(async (req, res) => {
    const { id: i } = req.query
    const value = Array.isArray(i) ? i[0] : i
    const id = Number(value) || null
    const domain = async (id: number) => {
      return removeActivity(id);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'remove activity')
        : wrapper.response(res, 'success', result, 'remove activity', 200);
    };
    return sendResponse(await domain(id));
  })
  .use(uploadMultipleMiddleware('images/activity'))
  .patch(validate({ body: activity }), async (req, res) => {
    const payload = req.body
    const { files, user } = req
    const { id: i } = req.query
    const value = Array.isArray(i) ? i[0] : i
    const id = Number(value) || null
    const domain = async (payload, id, files, user) => {
      return editActivity(payload, id, files, user);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'edit activity')
        : wrapper.response(res, 'success', result, 'edit activity', 200);
    };
    return sendResponse(await domain(payload, id, files, user));
})
export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
