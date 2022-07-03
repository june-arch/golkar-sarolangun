import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'
import { News } from '@/controller/interface/news'
import { deleteNews, findOneById, updateById } from '@/controller/query/news'
import { uploadMiddleware } from '@/controller/middleware/uploads'
import { unlinkByFileName } from '@/lib/filter-uploads'
import { news } from '@/controller/dto/news.dto'
import validate from "@/controller/middleware/validation";

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
    const result = await findOneById(valueId);
    if(!result){
        logger.error('data not found', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    response(res, 'success', {data: result}, 'get news', 200);
  })
  .delete( async (req, res) => {
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null; 
    const findNews = await findOneById(valueId);
    if(!findNews)
      response(res, 'failed', {data: null}, 'id not found', 400);
    
    await deleteNews(valueId)
    unlinkByFileName('images/news', findNews.image);
    response(res, 'success', {data: null}, 'delete news', 200);
  })
  .use(uploadMiddleware('images/news'))
  .put(validate({ body: news }), async (req: NextApiRequestModify, res) => {
    const { id } = req.query;
    const value = Array.isArray(id) ? id[0] : id;
    const valueId = Number(value) || null;
    if(!valueId){
        response(res, 'failed', {data: null}, 'invalid id', 400);    
    }
    const findNews = await findOneById(valueId);
    if(!findNews)
      response(res, 'failed', {data: null}, 'id not found', 400);
    
    const { title, content, category_news_id, publisher } = req.body;
    const { file, user } = req;
    if(file)
      unlinkByFileName('images/news', findNews.image);
    
    const doc: News = {
      title,
      category_news_id: Number(category_news_id),
      admin_id: user.id_admin,
      image: file ? file.filename : '',
      content,
      publisher,
      created_date: new Date()
    };
    const result = await updateById(valueId, doc);
    if(!result){
        logger.error('failed to update', result);
        response(res, 'failed', {data: null}, 'data not found', 404);
    }
    response(res, 'success', {data: result}, 'get news', 200);
  })

export default handler