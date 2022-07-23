import nextConnect from 'next-connect'
import jwt from '@/helpers/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/admin/interface'
import * as wrapper from '@/helpers/wrapper'
import { deleteRegion, editRegion, getOne } from '@/controller/region/domain'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    const { id: i } = req.query
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null
    const domain = async (id) => {
      return getOne(id);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'get one region')
        : wrapper.response(res, 'success', result, 'get one region', 200);
    };
    return sendResponse(await domain(id));
  })
  .patch(async (req, res) => {
    const payload = req.body;
    const { id: i } = req.query;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null;
    const domain = async (id, payload) => {
      return editRegion(id, payload);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'edit one region')
        : wrapper.response(res, 'success', result, 'edit one region', 200);
    };
    return sendResponse(await domain(id, payload));
  })
  .delete(async (req, res) => {
    const { id: i } = req.query;
    const value = Array.isArray(i) ? i[0] : i;
    const id = Number(value) || null;
    const domain = async (id) => {
      return deleteRegion(id);
    };
  
    const sendResponse = async (result) => {
      return (result.err) ? wrapper.response(res, 'failed', result, 'remove one region')
        : wrapper.response(res, 'success', result, 'remove one region', 200);
    };
    return sendResponse(await domain(id));
  })

export default handler
