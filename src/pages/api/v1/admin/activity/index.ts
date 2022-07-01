// import nextConnect from 'next-connect'
// import jwt from '@/middleware/jwt'
// import { NextApiResponse } from 'next'
// import { NextApiRequestModify } from '@/interface/admin'
// import { response, responsePage } from '@/lib/wrapper'
// import logger from '@/lib/logger/pino'
// import { countAll, create, findAllPagination } from '@/query/activity'
// import { Activity } from '@/interface/activity'

// const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

// handler
//   .use(jwt)
//   .get(async (req, res) => {
//     // You do not generally want to return the whole user object
//     const { page, limit } = req.query;
//     const dataPage = Array.isArray(page) ? page[0] : page;
//     const dataLimit = Array.isArray(limit) ? limit[0] : limit;
//     const valuePage = Number(dataPage) || 1;
//     const valueLimit = Number(dataLimit) || 10;
//     const result = await findAllPagination(valuePage, valueLimit);
//     const count = await countAll();
//     if (!result) {
//       logger.error('failed to find data', result);
//       response(res, 'failed', { data: null }, 'data not found', 404);
//     }
//     const meta = {
//       page: valuePage,
//       totalData: count,
//       totalDataOnPage: result.length,
//     }

//     responsePage(res, 'success', { data: result, meta }, 'get all news', 200);
//   })
//   .post(async (req, res) => {
//     const { category_activity_id, content, image, video } = req.body;
//     const activity: Activity = {
//         admin_id: 0,
//         category_activity_id: 0,
//         title: '',
//         content: '',
//         created_date: new Date(),
//         image: '',
//         video: ''
//     };
//     const result = await create(news)
//     response(res, 'success', { data: result }, 'created new news', 201);
//   })

// export default handler