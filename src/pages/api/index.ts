import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import cors from '@/helpers/middleware/cors';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(cors).get((req, res) => {
  res
    .status(200)
    .send({ message: 'this service is running well', code: 200, data: null });
});
export default handler;
