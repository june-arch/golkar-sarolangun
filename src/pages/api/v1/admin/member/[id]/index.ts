import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import {
  deleteMember,
  findOneById,
  updateById,
} from '@/controller/query/member'
import { uploadDiffMiddleware } from '@/controller/middleware/uploads'
import { unlinkByFileName } from '@/lib/filter-uploads'
import validate from '@/controller/middleware/validation'
import { configNext } from '@/controller/middleware/configNext'
import { updateMember } from '@/controller/dto/member.dto'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

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
    const result = await findOneById(valueId)
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404)
    }
    return response(res, 'success', { data: result }, 'get member', 200)
  })
  .delete(async (req, res) => {
    const { id } = req.query
    const value = Array.isArray(id) ? id[0] : id
    const valueId = Number(value) || null
    const find = await findOneById(valueId)
    if (!find)
      return response(res, 'failed', { data: null }, 'id not found', 404)

    await deleteMember(valueId)
    return response(res, 'success', { data: null }, 'delete member', 200)
  })
  .use(uploadDiffMiddleware('images/users'))
  .patch(
    validate({ body: updateMember }),
    async (req: NextApiRequestModify, res) => {
      const { id } = req.query
      const value = Array.isArray(id) ? id[0] : id
      const valueId = Number(value) || null
      if (!valueId) {
        return response(res, 'failed', { data: null }, 'invalid id', 400)
      }
      const find = await findOneById(valueId)
      if (!find)
        return response(res, 'failed', { data: null }, 'id not found', 404)

      const { region_id, status, date_of_birth, ...updateMember } = req.body
      const { files, user } = req

      if (region_id) {
        updateMember['region_id'] = Number(region_id)
      }
      if (date_of_birth) {
        updateMember['date_of_birth'] = new Date(date_of_birth)
      }
      if (status) {
        updateMember['status'] = Number(status)
      }
      if (files) {
        if (files['photo'] && files['photo'].length > 0) {
          updateMember['photo'] = files['photo'][0].filename
        }
        if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
          updateMember['photo_ktp'] = files['photo_ktp'][0].filename
        }
      }
      updateMember['updated_by'] = user.id_admin

      const result = await updateById(valueId, updateMember)
      if (!result) {
        return response(res, 'failed', { data: null }, 'data not found', 404)
      }
      if (files) {
        if (files['photo'] && files['photo'].length > 0) {
          unlinkByFileName('images/users', find.photo)
        }
        if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
          unlinkByFileName('images/users', find.photo_ktp)
        }
      }
      return response(res, 'success', { data: result }, 'update news', 200)
    }
  )

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
