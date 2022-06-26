import nextConnect from 'next-connect'
import jwt from '@/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/interface/admin'
import { response } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'
import { CategoryNews } from '@/interface/category-news'
import { deleteCategoryNews, findOneById, updateById } from '@/query/category-news'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
  .use(jwt)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
        response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
    const result = await findOneById(Number(valueId));
    if(!result){
        logger.error('data not found', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    response(res, 'success', {data: result}, 'get category news', 200);
  })
  .put( async (req, res) => {
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
        response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
    const { name, description } = req.body;
    const categoryNews: CategoryNews = {
        name,
        description,
    };
    const result = await updateById(valueId, categoryNews);
    if(!result){
        logger.error('failed to update', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    response(res, 'success', {data: result}, 'get category news', 200);
  })
  .delete( async (req, res) => {
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null; 
    await deleteCategoryNews(valueId)
    response(res, 'success', {data: null}, 'delete category news', 200);
  })

export default handler