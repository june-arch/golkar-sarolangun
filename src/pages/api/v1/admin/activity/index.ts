import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import { countAll, create, findAllPagination } from '@/controller/query/activity'
import { Activity } from '@/controller/interface/activity'
import { uploadMultipleMiddleware } from '@/controller/middleware/uploads'

import validate from "@/controller/middleware/validation";
import { configNext } from '@/controller/middleware/configNext'
import { activity } from '@/controller/dto/activity.dto'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { page, limit } = req.query;
    const dataPage = Array.isArray(page) ? page[0] : page;
    const dataLimit = Array.isArray(limit) ? limit[0] : limit;
    const valuePage = Number(dataPage) || 1;
    const valueLimit = Number(dataLimit) || 10;
    const result = await findAllPagination(valuePage, valueLimit);
    const count = await countAll();
    if (!result) {
      response(res, 'failed', { data: null }, 'data not found', 404);
    }
    const meta = {
      page: valuePage,
      totalData: count,
      totalDataOnPage: result.length,
    }

    responsePage(res, 'success', { data: result, meta }, 'get all activity', 200);
  })
  .use(uploadMultipleMiddleware('images/activity'))
  .post(validate({ body: activity }), async (req: NextApiRequestModify, res: NextApiResponse) => {
    const { title, category_activity_id, video } = req.body;
    const { files, user } = req;
    let imagesFilename = [];
    if (files && files.length > 0){
      files.forEach((value) => imagesFilename.push(value.filename));
    };
    const doc: Activity = {
      title,
      category_activity_id: Number(category_activity_id),
      admin_id: user.id_admin,
      image: imagesFilename.join(','),
      video,
      created_date: new Date()
    };
    const result = await create(doc)
    response(res, 'success', {data: result}, 'success create activity', 201);
  })

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};