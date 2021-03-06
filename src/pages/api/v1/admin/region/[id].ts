import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import { Region } from '@/controller/interface/region'
import {
  deleteRegional,
  findOneById,
  updateById,
} from '@/controller/query/region'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { id } = req.query
    const value = Array.isArray(id) ? id[0] : id
    const valueId = Number(value) || null
    if (!valueId) {
      return response(res, 'failed', { data: null }, 'invalid id', 400)
    }
    const result = await findOneById(Number(valueId))
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404)
    }
    return response(res, 'success', { data: result }, 'get regional', 200)
  })
  .patch(async (req, res) => {
    const { id } = req.query
    const value = Array.isArray(id) ? id[0] : id
    const valueId = Number(value) || null
    if (!valueId) {
      return response(res, 'failed', { data: null }, 'invalid id', 400)
    }
    const { ...editRegion } = req.body
    const region: Region = editRegion
    const result = await updateById(valueId, region)
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404)
    }
    return response(res, 'success', { data: result }, 'get regional', 200)
  })
  .delete(async (req, res) => {
    const { id } = req.query
    const value = Array.isArray(id) ? id[0] : id
    const valueId = Number(value) || null
    const find = await findOneById(valueId)
    if (!find)
      return response(res, 'failed', { data: null }, 'id not found', 404)

    await deleteRegional(valueId)
    return response(res, 'success', { data: null }, 'delete region', 200)
  })

export default handler
