import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

interface ExtendedRequest {
  user: string;
  params: {
    id: string;
    postId: string;
  }
}
interface ExtendedResponse {
  cookie(name: string, value: string): void;
}

const handler = nc<NextApiRequest, NextApiResponse>({ attachParams: true });
handler.get<ExtendedRequest, ExtendedResponse>((req, res) => {
  res.send(req.params);
});
export default handler;
