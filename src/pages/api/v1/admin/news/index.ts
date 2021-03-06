import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import { countAll, create, findAllPagination } from '@/controller/query/news'
import { News } from '@/controller/interface/news'
import { uploadMiddleware } from '@/controller/middleware/uploads'

import validate from '@/controller/middleware/validation'
import { configNext } from '@/controller/middleware/configNext'
import { news } from '@/controller/dto/news.dto'
import mv from 'mv'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { page, limit } = req.query
    const dataPage = Array.isArray(page) ? page[0] : page
    const dataLimit = Array.isArray(limit) ? limit[0] : limit
    const valuePage = Number(dataPage) || 1
    const valueLimit = Number(dataLimit) || 10
    const result = await findAllPagination(valuePage, valueLimit)
    const count = await countAll()
    if (!result) {
      return response(res, 'failed', { data: null }, 'data not found', 404)
    }
    const meta = {
      page: valuePage,
      totalData: count,
      totalDataOnPage: result.length,
      totalPage: Math.ceil(count / valueLimit),
    }

    return responsePage(
      res,
      'success',
      { data: result, meta },
      'get all news',
      200
    )
  })
  .use(uploadMiddleware('images/news'))
  .post(
    validate({ body: news }),
    async (req: NextApiRequestModify, res: NextApiResponse) => {
      const { title, content, category_news_id, author } = req.body
      const { file, user } = req
      const doc: News = {
        title,
        category_news_id: Number(category_news_id),
        admin_id: user.id_admin,
        image: file ? file.filename : '',
        content,
        author,
        created_date: new Date(),
      }
      let oldPath = `./tmp/uploads/images/news/${file.filename}`;
      let newPath = `./public/uploads/images/news/${file.filename}`;
      mv(oldPath, newPath, (err) => console.log(err));
      const result = await create(doc)
      return response(
        res,
        'success',
        { data: result },
        'success create news',
        201
      )
    }
  )

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
