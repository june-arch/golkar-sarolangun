import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import { Activity } from '@/controller/interface/activity'
import {
  deleteActivity,
  findOneById,
  updateById,
} from '@/controller/query/activity'
import { uploadMultipleMiddleware } from '@/controller/middleware/uploads'
import { activity } from '@/controller/dto/activity.dto'
import validate from '@/controller/middleware/validation'
import { unlinkByFileName } from '@/lib/filter-uploads'
import { configNext } from '@/controller/middleware/configNext'

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
    const result = await findOneById(Number(valueId))
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404)
    }
    return response(res, 'success', { data: result }, 'get activity', 200)
  })
  .delete(async (req, res) => {
    const { id } = req.query
    const value = Array.isArray(id) ? id[0] : id
    const valueId = Number(value) || null
    await deleteActivity(valueId)
    return response(res, 'success', { data: null }, 'delete activity', 200)
  })
  .use(uploadMultipleMiddleware('images/activity'))
  .put(validate({ body: activity }), async (req, res) => {
    const { id } = req.query
    const value = Array.isArray(id) ? id[0] : id
    const valueId = Number(value) || null
    if (!valueId) {
      return response(res, 'failed', { data: null }, 'invalid id', 400)
    }
    const findActivity = await findOneById(valueId)
    if (!findActivity)
      return response(res, 'failed', { data: null }, 'id not found', 404)
    const { title, category_activity_id, video } = req.body
    const { files, user } = req
    await removeFileImages(files, findActivity)
    let imagesFilename = []
    if (files && files.length > 0) {
      files.forEach((value) => imagesFilename.push(value.filename))
    }
    const activity: Activity = {
      title,
      category_activity_id: Number(category_activity_id),
      admin_id: findActivity.admin_id,
      image: imagesFilename.join(','),
      video,
      updated_by: user.id_admin,
      created_date: new Date(),
    }
    const result = await updateById(valueId, activity)
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404)
    }
    return response(res, 'success', { data: result }, 'update activity', 200)
  })

const removeFileImages = async (
  files: Express.Multer.File[],
  data: Activity
) => {
  if (files && files.length > 0) {
    for (let item of data.image.split(',')) {
      unlinkByFileName('images/activity', item)
    }
  }
}
export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
