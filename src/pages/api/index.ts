import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.get((req, res) => {
  res
    .status(200)
    .send({ message: 'this service is running well', code: 200, data: null });
});
export default handler;
