import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response, responsePage } from '@/lib/wrapper'
import { countAll, create, findAllPagination } from '@/controller/query/category-news'
import { CategoryNews } from '@/controller/interface/category-news'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

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
      return response(res, 'failed', { data: null }, 'data not found', 404);
    }
    const meta = {
      page: valuePage,
      totalData: count,
      totalDataOnPage: result.length,
    }

    return responsePage(res, 'success', { data: result, meta }, 'get all category news', 200);
  })
  .post(async (req, res) => {
    const { name, description } = req.body;
    const categoryNews: CategoryNews = {
      name,
      description,
    };
    const result = await create(categoryNews)
    return response(res, 'success', { data: result }, 'created new category news', 201);
  })

export default handler