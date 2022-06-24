import prisma from '@/lib/db/connection';
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
handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const result = await prisma.member.findMany();
  res.send(result);
});
export default handler;
